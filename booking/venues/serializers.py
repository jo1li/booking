from rest_framework import serializers

from .models import Venue, Slot, Event
from musicians.models import Musician


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


class SlotCreateUpdateSerializer(serializers.ModelSerializer):

    start_date = serializers.DateField(required=False)

    _start_time = serializers.TimeField(required=False)
    end_time = serializers.TimeField(required=False)

    duration = serializers.IntegerField(required=False)

    # Prefer the venue ID, but if a string is passed, create a new venue,
    #   but mark it as unconfirmed
    venue_id = serializers.IntegerField(required=False)

    venue = serializers.CharField(required=False)
    venue_city = serializers.CharField(required=False)
    venue_state = serializers.CharField(required=False)

    class Meta:
        model = Slot
        fields = '__all__'

    def create(self, validated_data):
        print("SlotCreateUpdateSerializer.create", validated_data)

        from datetime import datetime

        start_datetime = datetime.combine(validated_data['start_date'], validated_data['_start_time'])

        # if venue_id not in validated date, look for venue.
        #   if it doesn't exist create
        if 'venue_id' in  validated_data:
            print("Got a venue_id, load it simply")
        else:
            print("No venue_id, getting or creating jankily")
            venue, created = Venue.objects.get_or_create(
                    title=validated_data['venue'],
                    address_city=validated_data['venue_city'],
                    address_region_country=validated_data['venue_state']
                )

        print("venue", venue)

        event = Event.objects.create(
            venue=venue,
            event_start_datetime=start_datetime
        )

        musician = Musician.objects.get(user=self.context['request'].user)

        print("musician", musician)

        instance = Slot.objects.create(
            start_time=start_datetime,
            event=event,
            musician=musician
        )
        instance.save()

        print("instance", instance)

        return instance


    def validate(self, data):
        print("SlotCreateUpdateSerializer.validate", data)

        # TODO: validate the current user is a musician
        # user =  self.context['request'].user


        return data
