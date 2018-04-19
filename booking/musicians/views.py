from django.shortcuts import get_object_or_404

from booking.utils import opus_render
from account.decorators import login_required
import account.views

import random
import string

from .models import Musician
from .forms import SignupForm, MusicianForm

import requests

def profile(request, slug=None):

    musician = get_object_or_404(Musician, slug=slug)

    # Get instagram followers if there's an insta social auth
    insta_auth = request.user.social_auth.get(provider='instagram')

    insta_url = "https://api.instagram.com/v1/users/self/?access_token={}".format(insta_auth.extra_data['access_token'])
    r = requests.get(insta_url)

    insta_count = r.json()['data']['counts']['followed_by']


    context = {
        "musician": musician,
        "insta_count": insta_count
    }

    return opus_render(request, "musicians/profile.html", context)


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

    user = None

    if Musician.objects.filter(user=request.user).exists():
        user = Musician.objects.get(user=request.user)
        form = MusicianForm(request.POST, request.FILES, instance=user)
    else:
        form = MusicianForm(request.POST, request.FILES)

    if request.POST:
        musician = form.save(commit=False)
        musician.user = request.user
        musician.save()

    context = {
        'form': form,
        'user': user,
        'apptype': request.GET.get('apptype')
    }
    return opus_render(request, "musicians/editor.html", context)


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

