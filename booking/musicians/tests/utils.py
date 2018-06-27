import os

from django.conf import settings
from django.urls import reverse

from django.test import TransactionTestCase
from django_webtest import WebTest

from rest_framework.test import APIClient

from musicians.tests.mommy_recipes import musician_recipe, admin_user_recipe

class OpusTestCase(WebTest, TransactionTestCase):


    def setUp(self):
        self.a = admin_user_recipe.make()
        self.m = musician_recipe.make()

        self.app_api = APIClient()


    def tearDown(self):
        self.a.delete()

        self.m.refresh_from_db()

        self.m.image.delete()
        self.m.image_hero.delete()

        self.m.delete()


    def reverse_api(self, name, kwargs=None):
        v_kwarg = {
            'version': settings.DEFAULT_VERSION
        }

        if kwargs is not None:
            kwargs.update(v_kwarg)
        else:
            kwargs = v_kwarg

        return reverse(name, kwargs=kwargs)


    def get_api_reqs(self):

        result = self.app.get('/', user=self.m.user.username)
        csrf_token = self.get_csrf_from_headers(result)
        sessionid = self.get_session_from_headers(result)

        headers = { 'X-CSRFToken': csrf_token }
        cookies = { 'sessionid': sessionid }

        return headers, cookies


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


    def get_test_file(self, key='image', file='data/IMG_1201.JPG'):

        dir_path = os.path.dirname(os.path.realpath(__file__))

        f = open(os.path.join(dir_path, file), 'rb')
        return {key: f}
