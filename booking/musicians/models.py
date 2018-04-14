from django_extensions.db.models import TimeStampedModel
from django.db import models

from home.models import OpusUser

class Musician(TimeStampedModel):

    user = models.OneToOneField(OpusUser, on_delete=models.CASCADE, primary_key=True)

    first_name = models.CharField(max_length=256, null=True, blank=True)
    last_name = models.CharField(max_length=256, null=True, blank=True)
    stage_name = models.CharField(max_length=256, null=True, blank=True)
    slug = models.CharField(max_length=32, null=True, blank=True, unique=True)

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
    website = models.CharField(max_length=256, null=True, blank=True)
    bio = models.TextField(null=True, blank=True)
    bio_short = models.CharField(max_length=256, null=True, blank=True)

    # Social connections
    facebook = models.CharField(max_length=256, null=True, blank=True)
    twitter = models.CharField(max_length=256, null=True, blank=True)
    instagram = models.CharField(max_length=256, null=True, blank=True)
    youtube = models.CharField(max_length=256, null=True, blank=True)
    soundcloud = models.CharField(max_length=256, null=True, blank=True)
    bandcamp = models.CharField(max_length=256, null=True, blank=True)
    spotify = models.CharField(max_length=256, null=True, blank=True)



# Both of these fields would be better implemented as tags
class Instrument(models.Model):
    pass

class Genre(models.Model):
    pass


