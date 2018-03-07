from booking.utils import opus_render

# Create your views here.
def profile(request, slug=None):
    return opus_render(request, "venues/profile.html")


def event(request, venue_slug=None, event_slug=None):
    return opus_render(request, "venues/event.html")


def dashboard(request):
    return opus_render(request, "venues/dashboard.html")


def embeds(request):
    return opus_render(request, "venues/embeds.html")


def settings(request):
    return opus_render(request, "venues/settings.html")


def editor(request):
    return opus_render(request, "venues/editor.html")


def event_editor(request):
    return opus_render(request, "venues/event_editor.html")


def landing(request):
    return opus_render(request, "venues/landing.html")


def welcome(request):
    return opus_render(request, "venues/welcome.html")


def pretend_venue_site(request):
    return opus_render(request, "venues/pretend_venue_site.html")
