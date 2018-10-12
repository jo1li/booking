from tests.utils import OpusTestCase

import sure
from sure import expect

from http import HTTPStatus

from unittest import skip

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


    def test_artist_update(self):

        artist_api_url = self.reverse_api('artists-detail', kwargs={'pk': self.m.pk})

        headers, cookies = self.get_api_reqs()
        params = {
            'stage_name': 'stage name',
            'hometown': 'bumblefort',
        }

        self.app_api.force_authenticate(user=self.m.user)
        result = self.app_api.put(artist_api_url, params, format="json", headers=headers)

        result.status_code.should.equal(HTTPStatus.OK)

        result.json()['stage_name'].should.equal(params['stage_name'])
        result.json()['hometown'].should.equal(params['hometown'])

        self.m.refresh_from_db()
        self.m.stage_name.should.equal(params['stage_name'])
        self.m.hometown.should.equal(params['hometown'])


    def test_artist_cloudinary_upload(self):

        artist_api_url = self.reverse_api('artists-detail', kwargs={'pk': self.m.pk}) + "?filename=filename.jpg"

        headers, cookies = self.get_api_reqs()
        data = self.get_test_file()

        self.app_api.force_authenticate(user=self.m.user)

        response = self.app_api.put(artist_api_url, data, format='multipart')
        self.assertEqual(response.status_code, HTTPStatus.OK)

        # Ensure the image comes back with a cloudinary URL
        response.json()['image'].should.contain('https://res.cloudinary.com/opus-dev/image/upload/v1/media/')
