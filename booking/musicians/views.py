from booking.utils import opus_render

from account.decorators import login_required


def profile(request, slug=None):
    return opus_render(request, "musicians/profile.html")


@login_required
def dashboard(request):
    context = request.GET
    return opus_render(request, "musicians/dashboard.html", context)


@login_required
def editor(request):
    context = request.GET
    return opus_render(request, "musicians/editor.html", context)

@login_required
def venue_questions(request):
    return opus_render(request, "musicians/venue_questions.html")


@login_required
def settings(request):
    return opus_render(request, "musicians/settings.html")
