from .models import Musician, MusicianAudio, MusicianVideo
from rest_framework import serializers, viewsets, mixins, renderers


artist_fields = (
            'stage_name',
            'url_fq',
            'url_api',
            'image',
            'image_hero',
            'on_tour',
            'hometown',
            'bio',
            'bio_short',
            'website',
            'facebook',
            'instagram',
            'instagram_followers',
            'twitter',
            'twitter_followers',
            'spotify',
            'spotify_followers',
            'youtube',
            'soundcloud',
            'bandcamp',
        )


class ArtistVideoSerializer(serializers.ModelSerializer):


    class Meta:
        model = MusicianVideo
        fields = '__all__'


class ArtistSerializer(serializers.HyperlinkedModelSerializer):
    url_api = serializers.HyperlinkedIdentityField(view_name='artists-detail')

    image = serializers.ImageField(required=False, allow_empty_file=False)
    image_hero = serializers.ImageField(required=False, allow_empty_file=False)

    videos = ArtistVideoSerializer(many=True, read_only=True)


    class Meta:
        model = Musician
        fields = artist_fields + ('videos',)


class ArtistListSerializer(serializers.HyperlinkedModelSerializer):
    url_api = serializers.HyperlinkedIdentityField(view_name='artists-detail')

    class Meta:
        model = Musician
        fields = artist_fields
