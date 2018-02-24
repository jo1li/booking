from django_extensions.db.models import TimeStampedModel
from django.db import models

class Musician(TimeStampedModel):

    first_name = models.CharField(max_length=256, null=True, blank=True)
    last_name = models.CharField(max_length=256, null=True, blank=True)
    stage_name = models.CharField(max_length=256, null=True, blank=True)
    slug = models.CharField(max_length=32, null=True, blank=True)

    # This might be handled by the django user account app?
    email = models.CharField(max_length=256, null=True, blank=True)

    # Should we decide to populate a ton of profiles w/ out user consent,
    #   use this flag to indicate profiles that are owned
    claimed = models.BooleanField(default=True)

    # Need to think of a better name for band/individual
    # type =

    # When we get tagging in, we should implement here
    # instrument # Only if an individual
    # genre

    on_tour = models.NullBooleanField()
    website = models.CharField(max_length=256, null=True, blank=True)
    bio = models.TextField(null=True, blank=True)

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


