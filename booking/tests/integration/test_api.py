from tests.utils import OpusTestCase

import sure
from sure import expect

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
