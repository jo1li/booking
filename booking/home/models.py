from django.contrib.auth.models import AbstractUser
from django.db import models

from django.core.exceptions import ObjectDoesNotExist

import requests

class OpusUser(AbstractUser):
    is_musician = models.BooleanField('musician status', default=False)
    is_booking_agent = models.BooleanField('booking agent status', default=False)

    def instagram_followers(self):

        try:

            insta_auth = self.social_auth.get(provider='instagram')

            insta_url = "https://api.instagram.com/v1/users/self/?access_token={}".format(insta_auth.extra_data['access_token'])
            r = requests.get(insta_url)

        except ObjectDoesNotExist:
            return None

        return r.json()['data']['counts']['followed_by']
