from booking.utils import opus_render

# Create your views here.
def profile(request, slug=None):
    return opus_render(request, "musicians/profile.html")
