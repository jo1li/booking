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

    class Meta:
        model = Slot
        fields = '__all__'

    def create(self, instance, validated_data):
        instance = super().create(instance, validated_data)

        return instance
