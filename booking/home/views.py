from django.http import HttpResponse
from django.shortcuts import redirect
from django.contrib import auth

from booking.utils import opus_render

from account.views import LogoutView
from account.compat import is_authenticated

# Create your views here.
def healthcheck(request):
    return HttpResponse("<html><body>Healthy</body></html>")


def index(request):
    return opus_render(request, "home/index.html", {
            'range': range(10)
        })

def logout(request):
    if is_authenticated(request.user):
        auth.logout(request)
    return redirect("/")
