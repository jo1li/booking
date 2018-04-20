from django.conf import settings
from django_extensions.db.models import TimeStampedModel
from django.db import models

from django.db.models.signals import pre_save
from django.dispatch import receiver
from django.utils.text import slugify

from home.models import OpusUser

import twitter
from urllib import parse

class Musician(TimeStampedModel):

    user = models.OneToOneField(OpusUser, on_delete=models.CASCADE, primary_key=True)

    stage_name = models.CharField(max_length=256)
    slug = models.CharField(max_length=32, null=True, blank=True, unique=True)
    image = models.ImageField(upload_to='media/', blank=True)

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


    def twitter_followers(self):

        twitter_username = parse.urlparse(self.twitter).path.lstrip('/')

        api = twitter.Api(consumer_key=settings.SOCIAL_TWITTER_CONSUMER_KEY,
                          consumer_secret=settings.SOCIAL_TWITTER_CONSUMER_SECRET,
                          access_token_key=settings.SOCIAL_TWITTER_ACCESS_TOKEN,
                          access_token_secret=settings.SOCIAL_TWITTER_ACCESS_TOKEN_SECRET
                      )
        r = api.GetUser(screen_name=twitter_username)

        return r.followers_count

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


