import os
import json
from django.http import JsonResponse, HttpResponse
from django.shortcuts import redirect
from django.contrib import auth
from django.urls import reverse
from django.views.decorators.csrf import ensure_csrf_cookie

from booking.utils import opus_render

from musicians.models import Musician

from account.compat import is_authenticated
import account.forms
import account.views

# Create your views here.
def healthcheck(request):
    return HttpResponse("<html><body>Healthy</body></html>")


def deploy(request):
    deploy_json_path = '/app/deploy.json'

    if os.path.isfile(deploy_json_path):
        return JsonResponse(json.load(open(deploy_json_path)))
    else:
        return JsonResponse({})


@ensure_csrf_cookie
def index(request):
    return opus_render(request, "home/index.html")


def artists(request):
    return opus_render(request, "home/artists.html")


def venues(request):
    return opus_render(request, "home/venues.html")


def contact_us(request):
    return opus_render(request, "home/contact_us.html")


def privacy(request):
    return opus_render(request, "home/privacy.html")


def terms(request):
    return opus_render(request, "home/terms.html")


def logout(request):
    if is_authenticated(request.user):
        auth.logout(request)
    return redirect("/")


class LoginView(account.views.LoginView):

    form_class = account.forms.LoginEmailForm

    def get_success_url(self, fallback_url=None, **kwargs):

        # TODO: we'll need to make this more flexible for venues / bookers
        musician = Musician.objects.get(user=self.request.user)
        url = reverse("musician_profile", kwargs={'slug': musician.slug})

        return url




