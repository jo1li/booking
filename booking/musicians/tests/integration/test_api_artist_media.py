from musicians.tests.utils import OpusTestCase
from musicians.tests.mommy_recipes import musician_recipe

import sure

from http import HTTPStatus

class ApiArtistVideoTest(OpusTestCase):

    def test_create(self):

        artist_video_create_api_url = self.reverse_api('artist-videos-list', kwargs={'artist_pk': self.m.pk})

        headers, cookies = self.get_api_reqs()

        params = {
            'code': '<iframe width="560" height="315" src="https://www.youtube.com/embed/dQw4w9WgXcQ" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>',
        }

        self.app_api.force_authenticate(user=self.m.user)
        result = self.app_api.post(artist_video_create_api_url, params, format="json", headers=headers)

        result.json()['code'].should.equal(params['code'])
        result.json()['artist'].should.equal(self.m.pk)


    def test_list(self):

        # create a video for our user
        self.m.videos.create(code="<iframe></iframe>")
        self.m.save()

        # set up a 2nd user
        m2 = musician_recipe.make()
        m2.videos.create(code="<iframe></iframe>")
        m2.save()

        artist_video_list_url = self.reverse_api('artist-videos-list', kwargs={'artist_pk': m2.pk})
        headers, cookies = self.get_api_reqs()

        self.app_api.force_authenticate(user=m2.user)
        result = self.app_api.get(artist_video_list_url, {}, format="json", headers=headers)

        result.json()['count'].should.equal(1)

        result_ids = [r['id'] for r in result.json()['results']]
        user_vid_ids = [v.pk for v in m2.videos.all()]
        result_ids.should.equal(user_vid_ids)


class ApiArtistAudioTest(OpusTestCase):

    def test_create(self):

        artist_audio_create_api_url = self.reverse_api('artist-audios-list', kwargs={'artist_pk': self.m.pk})

        headers, cookies = self.get_api_reqs()

        params = {
            'code': '<iframe width="100%" height="300" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/328259811&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>',
        }

        self.app_api.force_authenticate(user=self.m.user)
        result = self.app_api.post(artist_audio_create_api_url, params, format="json", headers=headers)

        result.json()['code'].should.equal(params['code'])
        result.json()['artist'].should.equal(self.m.pk)


    def test_create_fail(self):

        # set up a 2nd user
        m2 = musician_recipe.make()

        artist_audio_create_api_url = self.reverse_api('artist-audios-list', kwargs={'artist_pk': self.m.pk})

        headers, cookies = self.get_api_reqs()

        params = {
            'code': '<iframe width="100%" height="300" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/328259811&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>',
        }

        self.app_api.force_authenticate(user=m2.user)
        result = self.app_api.post(artist_audio_create_api_url, params, format="json", headers=headers)
        result.status_code.should.equal(403)


    def test_list(self):

        # create a video for our user
        self.m.videos.create(code="<iframe></iframe>")
        self.m.save()

        # set up a 2nd user
        m2 = musician_recipe.make()
        m2.videos.create(code="<iframe></iframe>")
        m2.save()

        artist_video_list_url = self.reverse_api('artist-videos-list', kwargs={'artist_pk': m2.pk})
        headers, cookies = self.get_api_reqs()

        self.app_api.force_authenticate(user=m2.user)
        result = self.app_api.get(artist_video_list_url, {}, format="json", headers=headers)

        result.json()['count'].should.equal(1)

        result_ids = [r['id'] for r in result.json()['results']]
        user_vid_ids = [v.pk for v in m2.videos.all()]
        result_ids.should.equal(user_vid_ids)


class ApiArtistPhotoTest(OpusTestCase):


    def test_create(self):

        artist_photos_api_url = self.reverse_api('artist-photos-list', kwargs={'artist_pk': self.m.pk})

        headers, cookies = self.get_api_reqs()
        data = self.get_test_file()

        self.app_api.force_authenticate(user=self.m.user)

        response = self.app_api.post(artist_photos_api_url, data, format='multipart')
        self.assertEqual(response.status_code, HTTPStatus.CREATED)

        # Ensure the image comes back with a cloudinary URL
        response.json()['image'].should.contain('https://res.cloudinary.com/opus-dev/image/upload/v1/media/')

