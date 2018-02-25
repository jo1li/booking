from booking.utils import opus_render

from account.decorators import login_required


# Create your views here.
def profile(request, slug=None):
    return opus_render(request, "musicians/profile.html")

@login_required
def apply(request):
    return opus_render(request, "musicians/apply.html")
