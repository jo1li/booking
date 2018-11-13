from django.conf import settings
from home.models import OpusUser

from django.contrib.auth import login
from account.models import EmailAddress
from django.core.mail import EmailMessage

from .models import Musician, MusicianAudio, MusicianVideo, MusicianImage, GenreTag

from rest_framework import serializers
from rest_framework.validators import UniqueValidator


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
            'facebook_followers',
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
        fields = ('id', 'code', 'artist', 'order', 'created', 'modified', 'src')


    def update(self, instance, validated_data):

        if 'order' in validated_data.keys():
            instance.to(validated_data.get('order'))

        instance = super(ArtistVideoSerializer, self).update(instance, validated_data)

        return instance


class ArtistAudioSerializer(serializers.ModelSerializer):

    artist = serializers.PrimaryKeyRelatedField(required=False, read_only=True, source='musician')
    order = serializers.IntegerField(required=False)

    class Meta:
        model = MusicianAudio
        list_serializer_class = OrderedListSerializer
        fields = ('id', 'code', 'artist', 'order', 'created', 'modified', 'src')

    def update(self, instance, validated_data):

        if 'order' in validated_data.keys():
            instance.to(validated_data.get('order'))

        instance = super(ArtistAudioSerializer, self).update(instance, validated_data)

        return instance


class ArtistImageSerializer(serializers.ModelSerializer):

    artist = serializers.PrimaryKeyRelatedField(required=False, read_only=True, source='musician')
    order = serializers.IntegerField(required=False)

    class Meta:
        model = MusicianImage
        list_serializer_class = OrderedListSerializer
        fields = ('id', 'image', 'artist', 'order', 'created', 'modified')

    def update(self, instance, validated_data):

        if 'order' in validated_data.keys():
            instance.to(validated_data.get('order'))

        instance = super(ArtistImageSerializer, self).update(instance, validated_data)

        return instance


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
    image_hero = ArtistImageSerializer()

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
    image_hero = ArtistImageSerializer(required=False)
    image_hero_id = serializers.IntegerField(required=False)

    class Meta:
        model = Musician
        fields = artist_fields + ('audios', 'videos', 'photos', 'genres', 'image_hero_id',)


    def update(self, instance, validated_data):
        instance = super(ArtistSerializer, self).update(instance, validated_data)

        if validated_data.get('image_hero') is None:
            validated_data.pop('image_hero', None)

        if 'genres' in validated_data:
            instance.genres = validated_data['genres']

        instance.save()

        return instance


class ArtistCreateSerializer(serializers.Serializer):

    password = serializers.CharField(max_length=200)
    account_type = serializers.ChoiceField([c[0] for c in Musician.ACCOUNT_TYPE_CHOICES])
    name = serializers.CharField()
    email = serializers.EmailField(
            validators=[UniqueValidator(
                queryset=OpusUser.objects.all(),
                message='That email is already taken.'
            )]
        )
    slug = serializers.SlugField(
            validators=[UniqueValidator(
                queryset=Musician.objects.all(),
                message='That username is already taken.'
            )]
        )


    def create(self, validated_data):

        u = OpusUser.objects.create(
            email=validated_data.get('email'),
            username=validated_data.get('email'),
            is_musician=True
        )
        u.set_password(validated_data.get('password'))
        u.save()

        Musician.objects.create(user=u,
            stage_name=validated_data.get('name'),
            slug=validated_data.get('slug'),
            account_type=validated_data.get('account_type')
        )

        e = EmailAddress.objects.get(email=validated_data.get('email'))
        e.send_confirmation()

        # Start a web session
        #   If we ever cut to token auth, revisit this.
        login(self.context['request'], u, backend="django.contrib.auth.backends.ModelBackend")

        return {
            'email': validated_data.get('email'),
            'password': None,
            'account_type': validated_data.get('account_type'),
            'name': validated_data.get('name'),
            'slug': validated_data.get('slug'),
        }



class ArtistListSerializer(serializers.HyperlinkedModelSerializer):
    url_api = serializers.HyperlinkedIdentityField(view_name='artists-detail')

    class Meta:
        model = Musician
        fields = artist_fields


class ArtistMessageSerializer(serializers.Serializer):

    email = serializers.EmailField()
    name = serializers.CharField()
    message = serializers.CharField(max_length=10240)
    sent = serializers.BooleanField(read_only=True, required=False)


    def create(self, validated_data):

        m = Musician.objects.get(pk=self.context['view'].kwargs['artist_pk'])

        from_email = "{} <{}>".format(validated_data.get('name'), validated_data.get('email'))

        email = EmailMessage(
            'A message via Opus',
            validated_data.get('message'),
            from_email,
            [m.user.email, settings.MESSAGE_ARTIST_CC],
            [],
            reply_to=[validated_data.get('email')],
        )
        email.send(fail_silently=False)

        return {
            'email': validated_data.get('email'),
            'name': validated_data.get('name'),
            'message': validated_data.get('message'),
            'sent': True
        }
