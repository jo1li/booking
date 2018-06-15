from rest_framework.test import APIRequestFactory
from rest_framework.test import force_authenticate

from musicians.tests.mommy_recipes import musician_recipe, admin_user_recipe
from musicians.tests.utils import OpusTestCase

from home.models import OpusUser

import sure
from sure import expect

from collections import OrderedDict

class ApiTest(OpusTestCase):

    def test_api_root(self):
        result = self.app.get(self.reverse_api('api-root'))

        result.content_type.should.equal('application/json')
        result.status_code.should.equal(200)

        result.json.should.have.key('artists')
        expect(result.json['artists']).to.contain('v1/artists')


    def test_api_version(self):

        result = self.app.get('/v2/', expect_errors=True)
        result.status_code.should.equal(404)


class ApiArtistTest(OpusTestCase):

    def get_csrf_from_headers(self, result):

        for header in result.headerlist:
            if header[0] == 'Set-Cookie':
                if 'csrftoken' in header[1]:
                    tokenstr = header[1].split(';')[0]
                    return tokenstr.replace('csrftoken=', '').strip()


    def test_artist_list(self):

        result = self.app.get(self.reverse_api('artists-list'))
        result.status_code.should.equal(200)

        result.json["count"].should.equal(1)
        result.json["results"].should.have.length_of(1)


    def test_artist_create(self):

        artist_list_url = self.reverse_api('artists-list')

        result = self.app.put(artist_list_url, expect_errors=True)
        result.status_code.should.equal(403)
        result.json["detail"].should.equal("Authentication credentials were not provided.")

        result = self.app.get('/', user=self.a.username)
        csrf_token = self.get_csrf_from_headers(result)

        create_headers = {
            'X-CSRFToken': csrf_token
        }
        result = self.app.put(artist_list_url, headers=create_headers, expect_errors=True, user=self.a.username)
        result.json["detail"].should.equal("You do not have permission to perform this action.")


    def test_artist_update(self):

        artist_api_url = self.reverse_api('artists-detail', kwargs={'pk': self.m.pk})

        result = self.app.get('/', user=self.m.user.username)
        csrf_token = self.get_csrf_from_headers(result)

        headers = {
            'X-CSRFToken': csrf_token
        }
        params = {
            'hometown': 'bumblefort'
        }
        result = self.app.put(artist_api_url, params=params, headers=headers, expect_errors=True, user=self.m.user.username)

        print(result)
