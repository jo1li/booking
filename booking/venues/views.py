from booking.utils import opus_render

# Create your views here.
def profile(request, slug=None):
    return opus_render(request, "venues/profile.html")


def event(request, venue_slug=None, event_slug=None):
    return opus_render(request, "venues/event.html")
