from musicians.models import Musician

from tests.utils import OpusTestCase

import sure
from sure import expect

from http import HTTPStatus


class ApiArtistCreateTest(OpusTestCase):

    def get_csrf_from_headers(self, result):

        for header in result.headerlist:
            if header[0] == 'Set-Cookie':
                if 'csrftoken' in header[1]:
                    tokenstr = header[1].split(';')[0]
                    return tokenstr.replace('csrftoken=', '').strip()


    def test_artist_create(self):

        artist_list_url = self.reverse_api('artists-list')

        result = self.app.get('/')
        csrf_token = self.get_csrf_from_headers(result)

        slug = 'jim-stark'
        headers = {
            'X-CSRFToken': csrf_token,
        }
        params = {
            'email': 'test@sink.sendgrid.net',
            'password': 'password',
            'type': 'individual',
            'name': 'Jim Stark',
            'slug': slug
        }
        result = self.app_api.post(artist_list_url, params, headers=headers)
        result.status_code.should.equal(HTTPStatus.CREATED)

        sessionid_present = False
        for c in result.cookies.items():
            if 'sessionid' in c[1]:
                sessionid_present = True
                break

        if not sessionid_present:
            raise("Set-Cookie session header not present")

        # Ensure musician is available
        Musician.objects.get(slug=slug)

