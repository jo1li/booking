import os.path

from django.conf import settings
from django.shortcuts import render

DESIGN_V_SESSION_KEY = 'design_version'

def design_version(request):
    if DESIGN_V_SESSION_KEY in request.session:
        return request.session[DESIGN_V_SESSION_KEY]
    else:
        return ''


def opus_render(request, template, context={}, version=None):

    template = opus_get_template_path(request, template, version=version)

    return render(request, template, context=context)


def opus_get_template_path(request, template, version=None):

    if not version:
        version = settings.TEMPLATES_DESIGN_VERSION

    return os.path.join(version, template)

    # TODO: test this a bit better. It's a bunch o copy-pasta from IV
    design_version = request.GET.get("design")

    if design_version == None and DESIGN_V_SESSION_KEY in request.session:
        design_version = request.session[DESIGN_V_SESSION_KEY]

    if design_version is None or design_version == 'v1' or design_version == '':
        request.session[DESIGN_V_SESSION_KEY] = None
    elif design_version == 'v2':
        request.session[DESIGN_V_SESSION_KEY] = 'v2'

    if request.session[DESIGN_V_SESSION_KEY] is not None:
        proposed_template_path = os.path.join(settings.PROJECT_ROOT.child('templates'),
                                        request.session[DESIGN_V_SESSION_KEY],
                                        template)

        if os.path.isfile(proposed_template_path):
            template = os.path.join(request.session[DESIGN_V_SESSION_KEY], template)

    if version and 'v2' not in template:
            template = os.path.join('v2', template)

    return template


def v_url(pattern):
    vs = "|".join(settings.ALLOWED_VERSIONS)
    return "(?P<version>[%s]+)/%s" % (vs, pattern)
