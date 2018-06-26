from django.core.management import call_command

from rest_framework.test import APIRequestFactory
from rest_framework.test import force_authenticate

from musicians.tests.mommy_recipes import musician_recipe, admin_user_recipe
from musicians.tests.utils import OpusTestCase

from home.models import OpusUser
from musicians.models import GenreTag

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
        result.json["detail"].should.equal('Method "PUT" not allowed.')


    def test_artist_update(self):

        artist_api_url = self.reverse_api('artists-detail', kwargs={'pk': self.m.pk})

        headers, cookies = self.get_api_reqs()
        params = {
            'stage_name': 'stage name',
            'hometown': 'bumblefort',
        }

        self.app_api.force_authenticate(user=self.m.user)
        result = self.app_api.put(artist_api_url, params, format="json", headers=headers)

        result.status_code.should.equal(200)

        result.json()['stage_name'].should.equal(params['stage_name'])
        result.json()['hometown'].should.equal(params['hometown'])

        self.m.refresh_from_db()
        self.m.stage_name.should.equal(params['stage_name'])
        self.m.hometown.should.equal(params['hometown'])


class ApiArtistVideoTest(OpusTestCase):

    def test_create(self):

        artist_video_create_api_url = self.reverse_api('artist-videos-list', kwargs={'artist_pk': self.m.pk})

        headers, cookies = self.get_api_reqs()

        params = {
            'musician': self.m.pk,
            'code': '<iframe width="560" height="315" src="https://www.youtube.com/embed/dQw4w9WgXcQ" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>',
        }

        self.app_api.force_authenticate(user=self.m.user)
        result = self.app_api.post(artist_video_create_api_url, params, format="json", headers=headers)

        result.json()['code'].should.equal(params['code'])
        result.json()['musician'].should.equal(params['musician'])


class ApiGenreTagTest(OpusTestCase):

    def test_get(self):

        # This loads protected tags
        call_command('initial_tags')

        genres_list_url = self.reverse_api('genres-list')
        result = self.app.get(genres_list_url)

        result.json['count'].should.equal(len(GenreTag.TagMeta.genres))


    def test_update(self):

        artist_api_url = self.reverse_api('artists-detail', kwargs={'pk': self.m.pk})

        headers, cookies = self.get_api_reqs()
        params = {
            'stage_name': 'poop bucket head',
            'genres': 'Rock, Electronic',
        }
        self.app_api.force_authenticate(user=self.m.user)
        result = self.app_api.put(artist_api_url, params, format="json", headers=headers)

        result = self.app_api.get(artist_api_url, headers=headers)

        result.json()['genres'].should.have.length_of(2)
