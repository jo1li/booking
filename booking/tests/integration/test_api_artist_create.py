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

        name = 'Jim Stark'
        slug = 'jim-stark'
        account_type = 'individual'
        headers = {
            'X-CSRFToken': csrf_token,
        }
        params = {
            'email': 'test@sink.sendgrid.net',
            'password': 'password',
            'account_type': account_type,
            'name': name,
            'slug': slug
        }
        result = self.app_api.post(artist_list_url, params, headers=headers)
        result.status_code.should.equal(HTTPStatus.CREATED)

        result.json()['slug'].should.equal(slug)
        result.json()['name'].should.equal(name)
        result.json()['account_type'].should.equal(account_type)

        sessionid_present = False
        for c in result.cookies.items():
            if 'sessionid' in str(c[1]):
                sessionid_present = True
                break

        if not sessionid_present:
            raise("Set-Cookie session header not present")

        # Ensure musician is available
        m = Musician.objects.get(slug=slug)
        m.stage_name.should.equal(name)
        m.slug.should.equal(slug)
        m.account_type.should.equal(account_type)

