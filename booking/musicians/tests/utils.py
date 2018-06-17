from django.conf import settings
from django.urls import reverse

from django.test import TransactionTestCase
from django_webtest import WebTest

from rest_framework.test import APIClient

from musicians.tests.mommy_recipes import musician_recipe, admin_user_recipe

class OpusTestCase(WebTest):


    def setUp(self):
        self.a = admin_user_recipe.make()
        self.m = musician_recipe.make()

        self.app_api = APIClient()


    def reverse_api(self, name, kwargs=None):
        v_kwarg = {
            'version': settings.DEFAULT_VERSION
        }

        if kwargs is not None:
            kwargs.update(v_kwarg)
        else:
            kwargs = v_kwarg

        return reverse(name, kwargs=kwargs)


    def get_csrf_from_headers(self, result):

        for header in result.headerlist:
            if header[0] == 'Set-Cookie':
                if 'csrftoken' in header[1]:
                    tokenstr = header[1].split(';')[0]
                    return tokenstr.replace('csrftoken=', '').strip()


    def get_session_from_headers(self, result):

        for header in result.headerlist:
            if header[0] == 'Set-Cookie':
                if 'sessionid' in header[1]:
                    tokenstr = header[1].split(';')[0]
                    return tokenstr.replace('sessionid=', '').strip()
