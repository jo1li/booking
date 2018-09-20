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
        fields = '__all__'


class SlotSerializer(serializers.ModelSerializer):

    class Meta:
        model = Slot
        fields = '__all__'


class SlotCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = Slot
        fields = '__all__'

    def create(self, instance, validated_data):
        instance = super().create(instance, validated_data)

        return instance
