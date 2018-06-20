from .models import Musician, MusicianAudio, MusicianVideo, GenreTag
from rest_framework import serializers, viewsets, mixins, renderers


artist_fields = (
            'stage_name',
            'url_fq',
            'url_api',
            'image',
            'image_hero',
            'on_tour',
            'hometown',
            'state',
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


class ArtistGenreTagSerializer(serializers.ModelSerializer):

    id = serializers.IntegerField(required=False)
    slug = serializers.CharField(required=False)

    class Meta:
        model = GenreTag
        fields = ('id', 'name', 'slug',)


class ArtistSerializer(serializers.HyperlinkedModelSerializer):
    url_api = serializers.HyperlinkedIdentityField(view_name='artists-detail')

    stage_name = serializers.CharField(required=False)
    image = serializers.ImageField(required=False, allow_empty_file=False)
    image_hero = serializers.ImageField(required=False, allow_empty_file=False)

    videos = ArtistVideoSerializer(many=True, read_only=True)
    genres = ArtistGenreTagSerializer(many=True, read_only=True)

    class Meta:
        model = Musician
        fields = artist_fields + ('videos', 'genres',)


class ArtistUpdateSerializer(ArtistSerializer):
    genres = serializers.CharField(required=False)

    def update(self, instance, validated_data):
        instance = super(ArtistSerializer, self).update(instance, validated_data)

        instance.genres = validated_data.get('genres')
        instance.save()

        return instance


class ArtistListSerializer(serializers.HyperlinkedModelSerializer):
    url_api = serializers.HyperlinkedIdentityField(view_name='artists-detail')

    class Meta:
        model = Musician
        fields = artist_fields
