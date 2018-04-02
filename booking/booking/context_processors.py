from django.conf import settings

def template_version(request):
    return {
        'design_version': settings.TEMPLATES_DESIGN_VERSION,
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
