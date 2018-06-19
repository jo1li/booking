from django.conf import settings
from django.core.exceptions import ObjectDoesNotExist
from django_extensions.db.models import TimeStampedModel
from django.db import models

from django.db.models.signals import pre_save
from django.dispatch import receiver
from django.utils.text import slugify
from django.urls import reverse

from localflavor.us.models import USStateField
from ordered_model.models import OrderedModel

from home.models import OpusUser

import requests
import twitter
import spotipy
import spotipy.util as util
from urllib import parse

class Musician(TimeStampedModel):

    user = models.OneToOneField(OpusUser, on_delete=models.CASCADE, primary_key=True)

    stage_name = models.CharField(max_length=256)
    slug = models.CharField(max_length=32, null=True, blank=True, unique=True)
    image = models.ImageField(upload_to='media/', blank=True)
    image_hero = models.ImageField(upload_to='media/', blank=True)

    # Should we decide to populate a ton of profiles w/ out user consent,
    #   use this flag to indicate profiles that are owned
    claimed = models.BooleanField(default=True)

    # Need to think of a better name for band/individual
    # type =

    # When we get tagging in, we should implement here
    # instrument # Only if an individual
    # genre

    on_tour = models.NullBooleanField()
    hometown = models.CharField(max_length=256, null=True, blank=True)
    state = USStateField(null=True, blank=True)
    bio = models.TextField(null=True, blank=True)
    bio_short = models.CharField(max_length=256, null=True, blank=True)

    # Social connections
    website = models.CharField(max_length=256, null=True, blank=True)
    facebook = models.CharField(max_length=256, null=True, blank=True)
    twitter = models.CharField(max_length=256, null=True, blank=True)
    instagram = models.CharField(max_length=256, null=True, blank=True)
    youtube = models.CharField(max_length=256, null=True, blank=True)
    soundcloud = models.CharField(max_length=256, null=True, blank=True)
    bandcamp = models.CharField(max_length=256, null=True, blank=True)
    spotify = models.CharField(max_length=256, null=True, blank=True)


    def url_fq(self):
        return reverse('musician_profile', kwargs={'slug': self.slug})


    def url_api(self):
        return reverse('artist-detail', kwargs={'version': settings.DEFAULT_VERSION, 'pk': self.pk})


    def spotify_followers(self):

        try:
            spot_auth = self.user.social_auth.get(provider='spotify')
        except ObjectDoesNotExist:
            return None

        spot_id = parse.urlparse(self.spotify).path.lstrip('/').split('/')[-1]
        spot_artist_urn = "spotify:artist:{}".format(spot_id)

        # Just refresh the damn token every time.
        sp_oauth = spotipy.oauth2.SpotifyOAuth(
            settings.SOCIAL_AUTH_SPOTIFY_KEY,
            settings.SOCIAL_AUTH_SPOTIFY_SECRET,
            "https://opus.ngrok.io/complete/spotify/"
        )
        token = sp_oauth.refresh_access_token(spot_auth.extra_data['refresh_token'])

        sp = spotipy.Spotify(auth=token['access_token'])
        response = sp.artist(spot_artist_urn)

        return response['followers']['total']


    def instagram_followers(self):

        try:

            insta_auth = self.user.social_auth.get(provider='instagram')

            insta_url = "https://api.instagram.com/v1/users/self/?access_token={}".format(insta_auth.extra_data['access_token'])
            r = requests.get(insta_url)

        except ObjectDoesNotExist:
            return None

        return r.json()['data']['counts']['followed_by']


    def twitter_followers(self):

        if not self.twitter:
            return None

        twitter_username = parse.urlparse(self.twitter).path.lstrip('/')

        api = twitter.Api(consumer_key=settings.SOCIAL_TWITTER_CONSUMER_KEY,
                          consumer_secret=settings.SOCIAL_TWITTER_CONSUMER_SECRET,
                          access_token_key=settings.SOCIAL_TWITTER_ACCESS_TOKEN,
                          access_token_secret=settings.SOCIAL_TWITTER_ACCESS_TOKEN_SECRET
                      )
        r = api.GetUser(screen_name=twitter_username)

        return r.followers_count


    def facebook_followers(self):

        print("******* facebook_followers ********")

        page_name = parse.urlparse(self.facebook).path.lstrip('/').rstrip('/')
        print(page_name)

        try:

            facebook_auth = self.user.social_auth.get(provider='facebook')

        except ObjectDoesNotExist:
            return None

        import facebook
        graph = facebook.GraphAPI(access_token=facebook_auth.extra_data['access_token'])

        return graph.get_object("me/accounts")



class MusicianAudio(TimeStampedModel, OrderedModel):
    musician = models.ForeignKey(Musician, on_delete=models.CASCADE, related_name='audios')
    code = models.TextField()


class MusicianVideo(TimeStampedModel, OrderedModel):
    musician = models.ForeignKey(Musician, on_delete=models.CASCADE, related_name='videos')
    code = models.TextField()


@receiver(pre_save, sender=Musician)
def signal_musician_pre_save(sender, **kwargs):

    instance = kwargs['instance']

    if not instance.slug and instance.stage_name:
        instance.slug = slugify(instance.stage_name)


# Both of these fields would be better implemented as tags
class Instrument(models.Model):
    pass

class Genre(models.Model):
    pass


