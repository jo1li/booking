from django.conf import settings

def template_version(request):
        return {
            'design_version': settings.TEMPLATES_DESIGN_VERSION,
        }
