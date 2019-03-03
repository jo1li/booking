import os
import json
from django.http import JsonResponse, HttpResponse, HttpResponseNotFound, HttpResponseServerError
from django.shortcuts import redirect
from django.contrib import auth
from django.urls import reverse
from django.views.decorators.csrf import ensure_csrf_cookie

from booking.utils import opus_render, opus_get_template_path
from django.template.loader import render_to_string

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


def handler404(request):

    template = opus_get_template_path(request, "404.html")
    html404 = render_to_string(template)

    return HttpResponseNotFound(html404)


def handler500(request):

    template = opus_get_template_path(request, "500.html")
    html500 = render_to_string(template)

    return HttpResponseServerError(html500)


def example500(request):

    raise Exception("Ruh-roh")


@ensure_csrf_cookie
def index(request):
    return opus_render(request, "home/index.html")


def artists(request):
    return opus_render(request, "home/artists.html")


def venues(request):
    return opus_render(request, "home/venues.html")


def contact_us(request):
    return opus_render(request, "home/contact_us.html", {
        "url_shim": reverse("home")
    })


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

    def get_context_data(self, **kwargs):
        ctx = super(LoginView, self).get_context_data(**kwargs)
        ctx.update({
            "url_shim": reverse("home")
        })
        return ctx

    def get_success_url(self, fallback_url=None, **kwargs):

        # TODO: we'll need to make this more flexible for venues / bookers
        musician = Musician.objects.get(user=self.request.user)
        url = reverse("musician_profile", kwargs={'slug': musician.slug})

        return url


class ConfirmEmailView(account.views.ConfirmEmailView):


    def get_redirect_url(self):

        if is_authenticated(self.user):
            # TODO: we'll need to make this more flexible for venues / bookers
            musician = Musician.objects.get(user=self.request.user)
            url = reverse("musician_profile", kwargs={'slug': musician.slug})
        else:
            return reverse("opus_login")

        return url
