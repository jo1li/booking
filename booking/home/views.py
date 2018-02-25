from django.http import HttpResponse
from django.template import RequestContext

from booking.utils import opus_render

# Create your views here.
def healthcheck(request):
    return HttpResponse("<html><body>Healthy</body></html>")


def index(request):
    return opus_render(request, "home/index.html", {})
