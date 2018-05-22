from django.http import HttpResponse
from django.shortcuts import redirect
from django.contrib import auth

from booking.utils import opus_render

from account.compat import is_authenticated

import account.forms
import account.views

# Create your views here.
def healthcheck(request):
    return HttpResponse("<html><body>Healthy</body></html>")


def index(request):
    return opus_render(request, "home/index.html", {
            'range': range(10)
        })

def about(request):
    return opus_render(request, "home/about.html")


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
