from django.conf import settings
from django.urls import reverse

def template_version(request):
    return {
        'design_version': settings.TEMPLATES_DESIGN_VERSION,
    }

def common_words(request):
    return {
        'shows_word': 'Events'
    }

def home_url(request):

    if request.user.is_anonymous:
        url = reverse('home')
    else:
        if request.user.is_musician:
            url = reverse('musician_dash')
        elif request.user.is_booking_agent:
            url = reverse('venue_dashboard')
        else:
            url = reverse('home')


    return {
        "home_url": url
    }


def absolute_url(request):

    if 'HTTP_X_FORWARDED_PROTO' in request.META:
        proto = request.META['HTTP_X_FORWARDED_PROTO']
    else:
        proto = 'http'

    domain = settings.SITE_DOMAIN
    path = request.get_full_path()

    return {
        'absolute_url': "{0}://{1}{2}".format(proto, domain, path),
    }
