from django.test import TransactionTestCase
from django_webtest import WebTest
from django.conf import settings
from django.urls import reverse
from rest_framework.test import APIRequestFactory
from rest_framework.test import force_authenticate

from musicians.tests.mommy_recipes import musician_recipe, admin_user_recipe

from home.models import OpusUser

import sure
from sure import expect

from collections import OrderedDict

class ApiTest(WebTest):

    def test_api_root(self):
        result = self.app.get(reverse('api-root', kwargs={'version': settings.DEFAULT_VERSION}))

        result.content_type.should.equal('application/json')
        result.status_code.should.equal(200)

        result.json.should.have.key('artists')
        expect(result.json['artists']).to.contain('v1/artists')


    def test_api_version(self):

        result = self.app.get('/v2/', expect_errors=True)
        result.status_code.should.equal(404)


class ApiArtistTest(WebTest, TransactionTestCase):

    def get_csrf_from_headers(self, result):

        for header in result.headerlist:
            if header[0] == 'Set-Cookie':
                if 'csrftoken' in header[1]:
                    tokenstr = header[1].split(';')[0]
                    return tokenstr.replace('csrftoken=', '').strip()


    def test_artist_list(self):

        m = musician_recipe.make()

        result = self.app.get(reverse('artists-list', kwargs={'version': settings.DEFAULT_VERSION}))
        result.status_code.should.equal(200)

        result.json["count"].should.equal(1)
        result.json["results"].should.have.length_of(1)


    def test_artist_create(self):

        a = admin_user_recipe.make()

        m = musician_recipe.make()
        artist_list_url = reverse('artists-list', kwargs={'version': settings.DEFAULT_VERSION})

        result = self.app.put(artist_list_url, expect_errors=True)
        result.status_code.should.equal(403)

        result = self.app.get('/', user=a.username)
        csrf_token = self.get_csrf_from_headers(result)

        create_headers = {
            'X-CSRFToken': csrf_token
        }

        result = self.app.put(artist_list_url, headers=create_headers, expect_errors=True, user=a.username)
        result.json["detail"].should.equal('You do not have permission to perform this action.')



