from tests.utils import OpusTestCase

import sure
from sure import expect

from http import HTTPStatus

from tests.mommy_recipes import musician_recipe


class ApiArtistMessageTest(OpusTestCase):

    # TODO: test a 404
    # TODO: ensure invalid emails are sent back a
    # TODO: ensure CSRF is honored, as this is a completely unsecured API

    def test_artist_message(self):

        m = musician_recipe.make(user__email='henry.christopher@gmail.com')


        artist_msg_url = self.reverse_api('artist-messages-list', kwargs={'artist_pk': m.pk})

        # result = self.app.get('/')
        # csrf_token = self.get_csrf_from_headers(result)

        # headers = {
        #     'X-CSRFToken': csrf_token,
        # }
        params = {
            'email': 'test@sink.sendgrid.net',
            'name': 'Booker Dude',
            'message': 'You sound awesome! Come play my venue!'
        }
        result = self.app_api.post(artist_msg_url, params)

        result.status_code.should.equal(HTTPStatus.CREATED)
        result.json()['sent'].should.equal(True)

