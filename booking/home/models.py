from django.contrib.auth.models import AbstractUser
from django.db import models

class OpusUser(AbstractUser):
    is_musician = models.BooleanField('musician status', default=False)
    is_booking_agent = models.BooleanField('booking agent status', default=False)

