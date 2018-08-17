from .models import Musician, MusicianAudio, MusicianVideo, MusicianImage, GenreTag
from rest_framework import serializers


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

class OrderedListSerializer(serializers.ListSerializer):

    def to_representation(self, data):

        # Sometimes data is a list, which does not have an order_by
        #   TODO: better check, perhaps for presence of an order_by function.
        if type(data) != list:
            data = data.order_by('order')

        return super(OrderedListSerializer, self).to_representation(data)


class ArtistVideoSerializer(serializers.ModelSerializer):

    artist = serializers.PrimaryKeyRelatedField(required=False, read_only=True, source='musician')
    order = serializers.IntegerField(required=False)

    class Meta:
        model = MusicianVideo
        list_serializer_class = OrderedListSerializer
        fields = ('id', 'code', 'artist', 'order', 'created', 'modified')


    def update(self, instance, validated_data):

        if 'order' in validated_data.keys():
            instance.to(validated_data.get('order'))

        instance = super(ArtistVideoSerializer, self).update(instance, validated_data)

        return instance


class ArtistAudioSerializer(serializers.ModelSerializer):

    artist = serializers.PrimaryKeyRelatedField(required=False, read_only=True, source='musician')

    class Meta:
        model = MusicianAudio
        list_serializer_class = OrderedListSerializer
        fields = ('id', 'code', 'artist', 'order', 'created', 'modified')


class ArtistImageSerializer(serializers.ModelSerializer):

    artist = serializers.PrimaryKeyRelatedField(required=False, read_only=True, source='musician')

    class Meta:
        model = MusicianImage
        list_serializer_class = OrderedListSerializer
        fields = ('id', 'image', 'artist', 'order', 'created', 'modified')


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
    audios = ArtistAudioSerializer(many=True, read_only=True)

    # Could be images, but plural images doesn't seem to work with singular image field
    photos = ArtistImageSerializer(many=True, read_only=True)
    genres = ArtistGenreTagSerializer(many=True, read_only=True)

    class Meta:
        model = Musician
        fields = artist_fields + ('audios', 'videos', 'photos', 'genres',)


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
