from django.conf import settings as _settings
from django.shortcuts import get_object_or_404, redirect
from django.contrib import messages

from booking.utils import opus_render
from account.decorators import login_required
import account.views

from .models import Musician, MusicianAudio, MusicianVideo
from .forms import SignupForm, MusicianForm, MusicianAudioFormSet, MusicianVideoFormSet

from rest_framework import serializers, viewsets, mixins, renderers

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.reverse import reverse


class APIRoot(APIView):

    _ignore_model_permissions = True

    def get(self, request, version=_settings.DEFAULT_VERSION):
        return Response({
            'artists': reverse('artist-list', kwargs={'version': _settings.DEFAULT_VERSION}, request=request),
        })


class ArtistSerializer(serializers.HyperlinkedModelSerializer):

    url = serializers.URLField()

    class Meta:
        model = Musician
        fields = '__all__'


class ArtistViewSet(mixins.ListModelMixin,
                    mixins.RetrieveModelMixin,
                    mixins.UpdateModelMixin,
                    viewsets.GenericViewSet):
    queryset = Musician.objects.all()
    serializer_class = ArtistSerializer



def profile(request, slug=None):

    musician = get_object_or_404(Musician, slug=slug)

    context = {
        "musician": musician,
    }

    return opus_render(request, "musicians/profile.html", context)


def profile_template(request):
    return opus_render(request, "musicians/profile_template.html")


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

