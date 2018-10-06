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

    # Prefer the venue ID, but if a string is passed, create a new venue,
    #   but mark it as unconfirmed
    venue_id = serializers.IntegerField(required=False)

    venue_name = serializers.CharField(required=False)
    venue_city = serializers.CharField(required=False)
    venue_state = serializers.CharField(required=False)

    class Meta:
        model = Slot
        fields = [
            'id',
            'start_datetime',
            'end_datetime',
            'event',
            'musician',
            'venue_id',
            'venue_name',
            'venue_city',
            'venue_state',
            'public_description',
            'private_notes'
        ]

    def create(self, validated_data):

        # if venue_id not in validated date, look for venue.
        #   if it doesn't exist create
        if 'venue_id' in  validated_data:
            venue = Venue.objects.get(pk=validated_data['venue_id'])
        else:
            venue, created = Venue.objects.get_or_create(
                    title=validated_data['venue_name'],
                    address_city=validated_data['venue_city'],
                    address_region_country=validated_data['venue_state']
                )

        event = Event.objects.create(
            venue=venue,
            event_start_datetime=validated_data['start_datetime']
        )

        musician = Musician.objects.get(user=self.context['request'].user)

        instance = Slot.objects.create(
            start_datetime=validated_data['start_datetime'],
            end_datetime=validated_data['end_datetime'],
            event=event,
            musician=musician,
            public_description=validated_data['end_datetime']
        )
        instance.save()

        return instance


    def validate(self, data):

        # TODO: validate the current user is a musician
        # user =  self.context['request'].user

        # TODO: ensure either venue_id OR venue_name, city & state are present


        return data
