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

    venue = VenueSerializer()

    class Meta:
        model = Event
        fields = [
            'name',
            'description',
            'slug',
            'venue'
        ]


class SlotSerializer(serializers.ModelSerializer):

    event = EventSerializer()

    class Meta:
        model = Slot
        fields = '__all__'


class SlotCreateUpdateSerializer(SlotSerializer):

    start_date = serializers.DateField()

    start_time = serializers.TimeField()
    end_time = serializers.TimeField()

    duration = serializers.IntegerField(required=False)

    # Optional, if not set, we'll create a new event
    event = serializers.IntegerField(required=False)

    # Optional, setting to current logged in user if blank
    musician = serializers.IntegerField(required=False)

    # Prefer the venue ID, but if a string is passed, create a new venue,
    #   but mark it as unconfirmed
    venue_id = serializers.IntegerField(required=False)

    venue = serializers.CharField()
    venue_city = serializers.CharField()
    venue_state = serializers.CharField()

    class Meta:
        model = Slot
        fields = '__all__'

    def create(self, instance, validated_data):
        print("SlotCreateUpdateSerializer.create")
        instance = super().create(instance, validated_data)

        return instance


    def validate(self, data):
        print("SlotCreateUpdateSerializer.validate")
        print(data)

        return data
