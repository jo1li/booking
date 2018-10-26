from tests.utils import OpusTestCase
from tests.mommy_recipes import musician_image_recipe

from unittest import skip
import sure
from sure import expect

from http import HTTPStatus

from unittest import skip

class ApiArtistTest(OpusTestCase):


    @skip
    def test_artist_list(self):

        # TODO: Again, seeing that ImproperlyConfigured Exception on this endpoint
        result = self.app.get(self.reverse_api('artists-list'))
        result.status_code.should.equal(200)

        result.json["count"].should.equal(1)
        result.json["results"].should.have.length_of(1)


    def test_artist_detail(self):

        result = self.app.get(self.reverse_api('artists-detail', kwargs={'pk': self.m.pk}))
        result.status_code.should.equal(200)

        result.json["stage_name"].should.equal(self.m.stage_name)
        result.json['image_hero']['artist'].should.equal(self.m.pk)

        for k in ['id', 'image', 'order', 'created', 'modified']:
            result.json['image_hero'].should.have.key(k)


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

        result.status_code.should.equal(HTTPStatus.OK)

        result.json()['stage_name'].should.equal(params['stage_name'])
        result.json()['hometown'].should.equal(params['hometown'])

        self.m.refresh_from_db()
        self.m.stage_name.should.equal(params['stage_name'])
        self.m.hometown.should.equal(params['hometown'])


    def test_artist_update_hero(self):

        artist_hero_image = musician_image_recipe.make(musician=self.m)
        artist_api_url = self.reverse_api('artists-detail', kwargs={'pk': self.m.pk})

        headers, cookies = self.get_api_reqs()
        params = {
            'image_hero_id': artist_hero_image.pk
        }

        self.app_api.force_authenticate(user=self.m.user)
        result = self.app_api.put(artist_api_url, params, format="json", headers=headers)
        result.status_code.should.equal(HTTPStatus.OK)

        self.m.refresh_from_db()
        self.m.image_hero.should.equal(artist_hero_image)


    def test_artist_cloudinary_upload(self):

        artist_api_url = self.reverse_api('artists-detail', kwargs={'pk': self.m.pk}) + "?filename=filename.jpg"

        headers, cookies = self.get_api_reqs()
        data = self.get_test_file()

        self.app_api.force_authenticate(user=self.m.user)

        response = self.app_api.put(artist_api_url, data, format='multipart')
        self.assertEqual(response.status_code, HTTPStatus.OK)

        # Ensure the image comes back with a cloudinary URL
        response.json()['image'].should.contain('https://res.cloudinary.com/opus-dev/image/upload/v1/media/')
