from booking.utils import opus_render

# Create your views here.
def profile(request, slug=None):
    return opus_render(request, "venues/profile.html")


def event(request, venue_slug=None, event_slug=None):
    return opus_render(request, "venues/event.html")


def dashboard(request):
    return opus_render(request, "venues/dashboard.html")


def welcome(request):
    return opus_render(request, "venues/welcome.html")


def pretend_venue_site(request):
    return opus_render(request, "venues/pretend_venue_site.html")
