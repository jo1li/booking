from django.utils.six import StringIO
from django.core.management import call_command

from tests.utils import OpusTestCase

from musicians.models import GenreTag

import sure
from sure import expect


class ApiGenreTagTest(OpusTestCase):

    def test_get(self):

        # This loads protected tags
        out = StringIO()
        call_command('initial_tags', stdout=out)

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
