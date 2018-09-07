from rest_framework import serializers

from .models import Venue

class VenueListSerializer(serializers.ModelSerializer):
    api_url = serializers.HyperlinkedIdentityField(view_name='venues-detail')

    class Meta:
        model = Venue
        fields = '__all__'


class VenueSerializer(serializers.ModelSerializer):
    url_api = serializers.HyperlinkedIdentityField(view_name='venues-detail')

    class Meta:
        model = Venue
        fields = '__all__'
