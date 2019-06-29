from tests.utils import OpusTestCase
from tests.mommy_recipes import musician_recipe, random_video

from musicians.models import MusicianImage

import json
import sure
sure

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


    def test_order(self):

        # TODO: See if there's a way to get model_mommy to not inject a random value

        # create 3 videos for our user
        # video_recipe.make(musician=self.m)
        # video_recipe.make(musician=self.m)
        # video_recipe.make(musician=self.m)

        # create a video for our user
        self.m.videos.create(code=random_video())
        self.m.save()

        self.m.videos.create(code=random_video())
        self.m.save()

        # set up a 2nd user
        m2 = musician_recipe.make()
        m2.videos.create(code=random_video())
        m2.save()

        self.m.videos.create(code=random_video())
        self.m.save()


        artist_video_list_url = self.reverse_api('artist-videos-list', kwargs={'artist_pk': self.m.pk})
        headers, cookies = self.get_api_reqs()

        self.app_api.force_authenticate(user=self.m.user)
        result = self.app_api.get(artist_video_list_url, {}, format="json", headers=headers)

        # Check that self.m has order values of 0,1,2. In order.
        allowed_orders = [0,1,2]
        results = result.json()['results']
        order_results = [v['order'] for v in results]
        order_results.should.equal(allowed_orders)


    def test_order_update(self):

        # create videos for our user
        self.m.videos.create(code=random_video())
        self.m.save()

        self.m.videos.create(code=random_video())
        self.m.save()

        self.m.videos.create(code=random_video())
        self.m.save()

        last_vid = self.m.videos.all().first()

        code = "<code></code>"
        params = {
            'code': code,
            'order': 0
        }

        artist_video_detail_url = self.reverse_api('artist-videos-detail', kwargs={'artist_pk': self.m.pk, 'pk': last_vid.pk})
        headers, cookies = self.get_api_reqs()

        self.app_api.force_authenticate(user=self.m.user)
        result = self.app_api.put(artist_video_detail_url, params, format="json", headers=headers)

        result.json()['order'].should.equal(0)
        result.json()['code'].should.equal(code)

        artist_video_list_url = self.reverse_api('artist-videos-list', kwargs={'artist_pk': self.m.pk})
        headers, cookies = self.get_api_reqs()

        self.app_api.force_authenticate(user=self.m.user)
        result = self.app_api.get(artist_video_list_url, {}, format="json", headers=headers)

        # Check that self.m has order values of 0,1,2. In order.
        allowed_orders = [0,1,2]
        results = result.json()['results']
        order_results = [v['order'] for v in results]
        order_results.should.equal(allowed_orders)

        # Find last_vid and check the order is set correctly
        checked = False
        for r in results:
            if r['id'] == last_vid.pk:
                r['order'].should.equal(0)
                checked = True

        if not checked:
            self.fail("last_vid not in result")


    def test_order_delete(self):

        # create videos for our user
        self.m.videos.create(code=random_video())
        self.m.save()

        self.m.videos.create(code=random_video())
        self.m.save()

        self.m.videos.create(code=random_video())
        self.m.save()

        all_vid = self.m.videos.all()
        middle_vid_to_delete = all_vid[1]

        artist_video_delete_url = self.reverse_api('artist-videos-detail', kwargs={'artist_pk': self.m.pk, 'pk': middle_vid_to_delete.pk})
        headers, cookies = self.get_api_reqs()
        self.app_api.force_authenticate(user=self.m.user)
        result = self.app_api.delete(artist_video_delete_url, {}, format="json", headers=headers)
        result.status_code.should.equal(204)

        artist_video_list_url = self.reverse_api('artist-videos-list', kwargs={'artist_pk': self.m.pk})
        headers, cookies = self.get_api_reqs()
        self.app_api.force_authenticate(user=self.m.user)
        result = self.app_api.get(artist_video_list_url, {}, format="json", headers=headers)

        # Check that self.m has order values of 0,1,2. In order.
        allowed_orders = [0,1]
        results = result.json()['results']
        order_results = [v['order'] for v in results]
        order_results.should.equal(allowed_orders)


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


class ApiArtistPhotoTest(OpusTestCase):

    json_data = {
        "left": 5,
        "right": 7,
        "north": "57.5",
        "caption": "Here's some stuff!"
    }

    def test_get(self):

        img = MusicianImage.objects.create(
                musician=self.m,
                data=json.dumps(self.json_data)
            )

        artist_photos_api_url = self.reverse_api('artist-photos-list', kwargs={'artist_pk': self.m.pk})

        response = self.app_api.get(artist_photos_api_url)
        self.assertEqual(response.status_code, HTTPStatus.OK)

        results = response.json()['results']
        created_img = next(r for r in results if r["id"] == img.id)

        created_img['data'].should.equal(self.json_data)


    def test_create(self):

        artist_photos_api_url = self.reverse_api('artist-photos-list', kwargs={'artist_pk': self.m.pk})

        headers, cookies = self.get_api_reqs()
        data = self.get_test_file()
        data['data'] = json.dumps(self.json_data)

        self.app_api.force_authenticate(user=self.m.user)

        response = self.app_api.post(artist_photos_api_url, data, format='multipart')
        if response.status_code != HTTPStatus.CREATED:
            print(response.json())

        self.assertEqual(response.status_code, HTTPStatus.CREATED)

        # Ensure the image comes back with a cloudinary URL
        response.json()['image'].should.contain('https://res.cloudinary.com/opus-dev/image/upload/a_exif/v1/media/')
        response.json()['data'].should.equal(self.json_data)

