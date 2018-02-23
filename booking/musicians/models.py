from django_extensions.db.models import TimeStampedModel
from django.db import models

# Create your models here.
class Musician(TimeStampedModel):

    first_name = models.CharField(max_length=256, null=True, blank=True)
    last_name = models.CharField(max_length=256, null=True, blank=True)
    stage_name = models.CharField(max_length=256, null=True, blank=True)
