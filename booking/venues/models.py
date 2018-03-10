from django.db import models
from phonenumber_field.modelfields import PhoneNumberField

from musicians.models import Musician

class Venue(models.Model):
    title = models.CharField(max_length=256, null=True, blank=True)
    description = models.TextField(null=True, blank=True)

    address_city = models.CharField(max_length=256, null=True, blank=True)
    address_region_country = models.CharField(max_length=256, null=True, blank=True)
    address_region = models.CharField(max_length=256, null=True, blank=True)
    address_street = models.CharField(max_length=256, null=True, blank=True)
    address_string = models.CharField(max_length=256, null=True, blank=True)

    phone_number = PhoneNumberField(max_length=256, null=True, blank=True)

    website = models.CharField(max_length=256, null=True, blank=True)
    featured = models.BooleanField(default=False)
    slug = models.CharField(max_length=32, null=True, blank=True)

    # Social connections
    facebook = models.CharField(max_length=256, null=True, blank=True)
    twitter = models.CharField(max_length=256, null=True, blank=True)
    instagram = models.CharField(max_length=256, null=True, blank=True)

    # Should we decide to populate a ton of profiles w/ out user consent,
    #   use this flag to indicate profiles that are owned
    claimed = models.BooleanField(default=True)


class BookingAgent(models.Model):
    first_name = models.CharField(max_length=256, null=True, blank=True)
    last_name = models.CharField(max_length=256, null=True, blank=True)
    email = models.CharField(max_length=256, null=True, blank=True)
    title = models.CharField(max_length=256, null=True, blank=True)

    phone_number_office = PhoneNumberField(max_length=256, null=True, blank=True)
    phone_number_cell = PhoneNumberField(max_length=256, null=True, blank=True)

    # Social connections
    facebook = models.CharField(max_length=256, null=True, blank=True)
    twitter = models.CharField(max_length=256, null=True, blank=True)
    instagram = models.CharField(max_length=256, null=True, blank=True)


class Event(models.Model):

    EVENT_TYPES = (
        (0, 'CLUB'),
        (1, 'FESTIVAL'),
        (2, 'MUSIC_SERIES'),
        (3, 'PUBLICATION'),
        (4, 'COFFEE_HOUSE'),
        (5, 'BROADCAST'),
        (6, 'MANAGEMENT'),
        (7, 'SONGWRITING'),
        (8, 'SPECIAL_EVENTS'),
        (9, 'CONFERENCE'),
        (10, 'RECORD LABEL'),
        (11, 'COMPILATION'),
        (12, 'INTERNET'),
    )

    name = models.CharField(max_length=256, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    notes = models.TextField(null=True, blank=True)
    slug = models.CharField(max_length=32, null=True, blank=True)

    event_type = models.SmallIntegerField(null=True, choices=EVENT_TYPES)

    # genre =

    compensated = models.BooleanField(default=False)
    compensation_food_drink_tickets = models.BooleanField(default=False)
    compensation_general_compensation = models.BooleanField(default=False)
    compensation_max_flat_rate = models.DecimalField(max_digits=8, decimal_places=2)
    compensation_min_flat_rate = models.DecimalField(max_digits=8, decimal_places=2)
    compensation_percent_of_door = models.DecimalField(max_digits=2, decimal_places=2)
    compensation_percent_of_merchandise_sales = models.DecimalField(max_digits=2, decimal_places=2)

    # Pay to play
    # tickets_presale_required = models.BooleanField(default=False)
    # tickets_minimum_sales_required = models.BooleanField(default=False)


    review_by_datetime = models.DateTimeField()

    entry_start_datetime = models.DateTimeField()
    entry_end_datetime = models.DateTimeField()
    event_start_datetime = models.DateTimeField()
    event_end_datetime = models.DateTimeField()

    min_entry_price = models.DecimalField(max_digits=8, decimal_places=2)
    max_entry_price = models.DecimalField(max_digits=8, decimal_places=2)


class Slot(models.Model):
    start_time = models.DateTimeField()
    duration = models.SmallIntegerField()
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    musician = models.ForeignKey(Musician, on_delete=models.CASCADE)
    notes = models.TextField(null=True, blank=True)


class Application(models.Model):
    pass

