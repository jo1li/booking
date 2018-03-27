from booking.utils import opus_render
from account.decorators import login_required
import account.views

from .forms import SignupForm
from .models import  Musician



def profile(request, slug=None):
    return opus_render(request, "musicians/profile.html")


@login_required
def dashboard(request):

    context = {
        "applied": request.GET.get('applied'),
        "profile_created": Musician.objects.filter(user=request.user).exists()
    }
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


class SignupView(account.views.SignupView):

    form_class = SignupForm
    identifier_field = 'email'

    def generate_username(self, form):
        # do something to generate a unique username (required by the
        # Django User model, unfortunately)
        username = "<magic>"
        return username
