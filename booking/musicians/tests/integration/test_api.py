from django.test import TransactionTestCase
from django_webtest import WebTest
from django.conf import settings
from django.urls import reverse

from rest_framework.test import APIRequestFactory
from rest_framework.test import force_authenticate

from musicians.tests.mommy_recipes import musician_recipe

import sure
from sure import expect


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

    def test_artist_list(self):

        musician_recipe.make()

        result = self.app.get(reverse('artists-list', kwargs={'version': settings.DEFAULT_VERSION}))
        result.status_code.should.equal(200)

        result.json["count"].should.equal(1)
        result.json["results"].should.have.length_of(1)


    def test_artist_create(self):

        result = self.app.put(reverse('artists-list', kwargs={'version': settings.DEFAULT_VERSION}), expect_errors=True)
        result.status_code.should.equal(403)

        # TODO: Successfully create
