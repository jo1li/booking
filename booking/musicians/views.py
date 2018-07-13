from django.shortcuts import get_object_or_404, redirect
from django.contrib import messages

import json
from booking.utils import opus_render
from account.decorators import login_required
import account.views

from .models import Musician, MusicianAudio, MusicianVideo, GenreTag
from .forms import SignupForm, MusicianForm, MusicianAudioFormSet, MusicianVideoFormSet
from .serializers import ArtistSerializer, ArtistListSerializer, ArtistUpdateSerializer, ArtistVideoSerializer, ArtistAudioSerializer, ArtistGenreTagSerializer

from rest_framework import viewsets, mixins, permissions
from rest_framework.reverse import reverse
from rest_framework.parsers import JSONParser, MultiPartParser


class GenreTagViewSet(mixins.ListModelMixin, viewsets.GenericViewSet):
    """
    GET /v1/genres/:
    Return a list of protected genres
    """

    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

    serializer_class = ArtistGenreTagSerializer
    queryset = GenreTag.objects.filter(protected=True)


class ArtistMediaViewSet(mixins.ListModelMixin,
                    mixins.CreateModelMixin,
                    mixins.UpdateModelMixin,
                    viewsets.GenericViewSet):

    def get_queryset(self):
        """
        This view should return a list of all the videos for
        the user as determined by the <id> portion of the URL.
        """

        m = get_object_or_404(Musician, pk=self.kwargs['artist_pk'])
        return self.serializer_class.Meta.model.objects.filter(musician=m)


class ArtistVideoViewSet(ArtistMediaViewSet):
    """
    GET /v1/artists/<id>/videos/:
    Return a list of an artists videos.

    POST /v1/artists/<id>/videos/:
    Create an artist video instance.

    PUT /v1/artists/<id>/videos/<id>:
    Update a single artist video instance.
    """

    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    serializer_class = ArtistVideoSerializer


class ArtistAudioViewSet(mixins.ListModelMixin,
                    mixins.CreateModelMixin,
                    mixins.UpdateModelMixin,
                    viewsets.GenericViewSet):
    """
    GET /v1/artists/<id>/audios/:
    Return a list of an artists audios.

    POST /v1/artists/<id>/audios/:
    Create an artist audio instance.

    PUT /v1/artists/<id>/audios/<id>:
    Update a single artist video instance.
    """

    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

    queryset = MusicianAudio.objects.all()
    serializer_class = ArtistAudioSerializer


class ArtistViewSet(mixins.ListModelMixin,
                    mixins.RetrieveModelMixin,
                    mixins.UpdateModelMixin,
                    viewsets.GenericViewSet):
    """
    GET /v1/artists/:
    Return a list of all the existing artists.

    GET /v1/artists/<id>:
    Retrieve a single artist instance.

    PUT /v1/artists/<id>:
    Update a single artist instance.

    To upload `image` and `image_hero` the API call must be sent as a MultiPartForm
        https://stackoverflow.com/questions/4526273/what-does-enctype-multipart-form-data-mean

    Note: genres should be comma delimited, in the format described http://radiac.net/projects/django-tagulous/documentation/parser/
        When this call returns, it will return a string, but Get calls will return an array of objects.
    """

    parser_classes = (JSONParser, MultiPartParser,)
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

    queryset = Musician.objects.all()
    serializer_class = ArtistSerializer


    def list(self, *args, **kwargs):
        self.serializer_class = ArtistListSerializer
        return mixins.ListModelMixin.list(self, *args, **kwargs)


    def retrieve(self, *args, **kwargs):
        self.serializer_class = ArtistSerializer
        return mixins.RetrieveModelMixin.retrieve(self, *args, **kwargs)


    def update(self, *args, **kwargs):
        self.serializer_class = ArtistUpdateSerializer
        return mixins.UpdateModelMixin.update(self, *args, **kwargs)


    def perform_update(self, serializer):

        for i in ['image', 'image_hero']:
            if self.request.data.get(i):
                setattr(serializer, i, self.request.data.get(i))

        return mixins.UpdateModelMixin.perform_update(self, serializer)


def profile(request, slug=None):

    musician = get_object_or_404(Musician, slug=slug)
    videos = musician.videos.all()

    context = {
        "musician": musician,
        "videos": videos,
        "videos_json": json.dumps([video.src for video in videos]),
    }

    return opus_render(request, "musicians/profile.html", context)


def profile_template(request):
    return opus_render(request, "musicians/profile_template.html")


@login_required
def api_test(request):

    return opus_render(request, "musicians/api_test.html", {})


@login_required
def social(request):

    # TODO: set up a better way of listing social integrations based on existing context_processor
    #   https://github.com/python-social-auth/social-app-django/blob/master/social_django/context_processors.py
    # from social_core.backends.utils import user_backends_data
    # from social_django.utils import Storage, BACKENDS

    # print(BACKENDS)
    # print(user_backends_data(request.user, BACKENDS, Storage))


    all_socials = {
        'instagram': {},
        'facebook': {},
        'spotify': {},
    }

    for social in all_socials.keys():
        if request.user.social_auth.filter(provider=social).exists():
            all_socials[social]['social_auth'] = request.user.social_auth.get(provider=social)

    context = {
        "all_socials": all_socials,
    }

    return opus_render(request, "musicians/social.html", context)


@login_required
def dashboard(request):

    musician = None

    if Musician.objects.filter(user=request.user).exists():
        musician = Musician.objects.get(user=request.user)

    context = {
        "applied": request.GET.get('applied'),
        "musician": musician,
        "profile_created": musician
    }
    return opus_render(request, "musicians/dashboard.html", context)


@login_required
def editor(request):

    musician = None

    if Musician.objects.filter(user=request.user).exists():
        musician = Musician.objects.get(user=request.user)
        if request.POST or request.FILES:
            form = MusicianForm(request.POST, request.FILES, instance=musician)
        else:
            form = MusicianForm(instance=musician)
    else:
        form = MusicianForm(request.POST, request.FILES)

    if form.is_valid():
        musician = form.save(commit=False)
        musician.user = request.user
        musician.save()

        # for genres
        form.save_m2m()

        # Show a success message
        messages.success(request, 'Profile details updated. Yay.')

        # redirect to same page, to avoid the stupid repost issue
        redirect('musician_dash')

    context = {
        'form': form,
        'musician': musician,
        'apptype': request.GET.get('apptype')
    }
    return opus_render(request, "musicians/editor.html", context)


@login_required
def editor_audio(request):

    # TODO: handle musician not existing
    musician = Musician.objects.get(user=request.user)

    if request.method == "POST":
        formset = MusicianAudioFormSet(
            request.POST, request.FILES,
            queryset=MusicianAudio.objects.filter(musician=musician),
            musician_id=musician.pk,
            initial=[{'musician': musician}]
        )

        if formset.is_valid():
            formset.save()

            messages.success(request, 'Audio saved. Yay.')
            return redirect('musician_editor_audio')


    else:
        formset = MusicianAudioFormSet(
                queryset=MusicianAudio.objects.filter(musician=musician),
                musician_id=musician.pk,
                initial=[{'musician': musician}]
            )

    context = {
        'formset': formset
    }
    return opus_render(request, "musicians/editor_audio.html", context)


@login_required
def editor_video(request):

    # TODO: handle musician not existing
    musician = Musician.objects.get(user=request.user)

    if request.method == "POST":
        formset = MusicianVideoFormSet(
            request.POST, request.FILES,
            queryset=MusicianVideo.objects.filter(musician=musician),
            musician_id=musician.pk,
            initial=[{'musician': musician}]
        )

        if formset.is_valid():
            formset.save()

            messages.success(request, 'Video saved. Yay.')
            return redirect('musician_editor_video')


    else:
        formset = MusicianVideoFormSet(
                queryset=MusicianVideo.objects.filter(musician=musician),
                musician_id=musician.pk,
                initial=[{'musician': musician}]
            )

    context = {
        'formset': formset
    }
    return opus_render(request, "musicians/editor_video.html", context)


@login_required
def venue_questions(request):
    return opus_render(request, "musicians/venue_questions.html")


@login_required
def settings(request):
    return opus_render(request, "musicians/settings.html")


class SignupView(account.views.SignupView):

    form_class = SignupForm
    identifier_field = 'email'

    def get_success_url(self, fallback_url=None, **kwargs):
        return reverse('musician_dash')


    def generate_username(self, form):
        # do something to generate a unique username (required by the
        # Django User model, unfortunately)
        return form.data['email']


    def after_signup(self, form):
        self.update_profile(form)
        super(SignupView, self).after_signup(form)


    def update_profile(self, form):
        self.created_user.is_musician = True
        self.created_user.save()

