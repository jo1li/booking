from tests.utils import OpusTestCase
from venues.models import Slot

import sure
from sure import expect

from http import HTTPStatus

from tests.mommy_recipes import slot_recipe

import pprint
pp = pprint.PrettyPrinter(indent=4)

class ApiSlotTest(OpusTestCase):

    def setUp(self):
        super().setUp()

        self.s = slot_recipe.make()

    def test_slot_list(self):

        result = self.app.get(self.reverse_api('slots-list'))
        result.status_code.should.equal(HTTPStatus.OK)

        result.json["count"].should.equal(1)
        result.json["results"].should.have.length_of(1)
        result.json["results"][0].should.have.key('event')
        result.json["results"][0]['event'].should.have.key('venue')


    def test_slot_create_auth(self):

        slot_list_url = self.reverse_api('slots-list')

        result = self.app.post(slot_list_url, expect_errors=True)
        result.status_code.should.equal(403)
        result.json["detail"].should.equal("Authentication credentials were not provided.")


    def test_slot_create(self):

        # This is dependent on setUp
        Slot.objects.all().count().should.equal(1)

        slot_list_url = self.reverse_api('slots-list')

        headers, cookies = self.get_api_reqs()
        self.app_api.force_authenticate(user=self.m.user)

        params = {
            'start_datetime': '2018-10-29 18:45:00',
            'end_datetime': '2018-10-29 19:45:00',
            'venue_name': 'The Living Room',
            'venue_city': 'New York',
            'venue_state': 'NY',
            'public_description': 'A bomb-ass time'
        }
        result = self.app_api.post(slot_list_url, params, format="json", headers=headers)
        result.status_code.should.equal(HTTPStatus.CREATED)

        Slot.objects.all().count().should.equal(2)

        # pp.pprint(result.json())
        # print(Slot.objects.get(pk=result.json()['id']))

    # def test_artist_update(self):

    #     artist_api_url = self.reverse_api('artists-detail', kwargs={'pk': self.m.pk})

    #     headers, cookies = self.get_api_reqs()
    #     params = {
    #         'stage_name': 'stage name',
    #         'hometown': 'bumblefort',
    #     }

    #     self.app_api.force_authenticate(user=self.m.user)
    #     result = self.app_api.put(artist_api_url, params, format="json", headers=headers)

    #     result.status_code.should.equal(HTTPStatus.OK)

    #     result.json()['stage_name'].should.equal(params['stage_name'])
    #     result.json()['hometown'].should.equal(params['hometown'])

    #     self.m.refresh_from_db()
    #     self.m.stage_name.should.equal(params['stage_name'])
    #     self.m.hometown.should.equal(params['hometown'])


    # def test_artist_cloudinary_upload(self):

    #     artist_api_url = self.reverse_api('artists-detail', kwargs={'pk': self.m.pk}) + "?filename=filename.jpg"

    #     headers, cookies = self.get_api_reqs()
    #     data = self.get_test_file()
    #     data.update(self.get_test_file('image_hero', 'data/test_hero.jpg'))

    #     self.app_api.force_authenticate(user=self.m.user)

    #     response = self.app_api.put(artist_api_url, data, format='multipart')
    #     self.assertEqual(response.status_code, HTTPStatus.OK)

    #     # Ensure the image comes back with a cloudinary URL
    #     response.json()['image'].should.contain('https://res.cloudinary.com/opus-dev/image/upload/v1/media/')
    #     response.json()['image_hero'].should.contain('https://res.cloudinary.com/opus-dev/image/upload/v1/media/')
