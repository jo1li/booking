from django.conf import settings
from django.urls import reverse

from django.test import TransactionTestCase
from django_webtest import WebTest


class OpusTestCase(WebTest, TransactionTestCase):


    def reverse_api(self, name, **kwargs):
        v_kwarg = {
            'version': settings.DEFAULT_VERSION
        }

        if kwargs:
            kwargs = kwargs.update(v_kwarg)
        else:
            kwargs = v_kwarg

        return reverse(name, kwargs=kwargs)

    def get_csrf_from_headers(self, result):

        for header in result.headerlist:
            if header[0] == 'Set-Cookie':
                if 'csrftoken' in header[1]:
                    tokenstr = header[1].split(';')[0]
                    return tokenstr.replace('csrftoken=', '').strip()
