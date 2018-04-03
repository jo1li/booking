from booking.utils import opus_render
from account.decorators import login_required
import account.views

import random
import string

from .models import Musician
from .forms import SignupForm, MusicianForm


def profile(request, slug=None):
    return opus_render(request, "musicians/profile.html")


@login_required
def dashboard(request):

    context = {
        "applied": request.GET.get('applied'),
        "profile_created": Musician.objects.filter(user=request.user).exists()
    }
    return opus_render(request, "musicians/dashboard.html", context)


@login_required
def editor(request):

    print(request.POST)

    if Musician.objects.filter(user=request.user).exists():
        form = MusicianForm(request.POST, instance=Musician.objects.get(user=request.user))
    else:
        form = MusicianForm(request.POST)

    if request.POST:
        musician = form.save(commit=False)
        musician.user = request.user
        musician.save()

    context = {
        'form': form,
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

