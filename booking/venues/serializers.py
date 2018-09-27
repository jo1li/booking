from rest_framework import serializers

from .models import Venue, Slot, Event

class VenueListSerializer(serializers.ModelSerializer):

    class Meta:
        model = Venue
        fields = '__all__'


class VenueSerializer(serializers.ModelSerializer):

    class Meta:
        model = Venue
        fields = '__all__'


class EventSerializer(serializers.ModelSerializer):

    class Meta:
        model = Event
        # TODO: remove fields, like notes, that supposed to private to event / venue owner
        fields = '__all__'


class SlotSerializer(serializers.ModelSerializer):

    event = EventSerializer()
    venue = VenueSerializer(source='event.venue')

    class Meta:
        model = Slot
        fields = '__all__'


class SlotCreateSerializer(SlotSerializer):

    # Optional, if not set, we'll create a new event
    event_id = serializers.IntegerField()

    # Prefer the venue ID, but if a string is passed, create a new venue,
    #   but mark it as unconfirmed
    venue_id = serializers.IntegerField()

    venue = serializers.CharField()
    venue_city = serializers.CharField()
    venue_state = serializers.CharField()

    class Meta:
        model = Slot
        fields = '__all__'

    def create(self, instance, validated_data):
        instance = super().create(instance, validated_data)

        return instance
