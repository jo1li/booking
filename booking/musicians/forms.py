from django.forms import ModelForm
from django import forms
from django.forms import modelformset_factory

import account.forms

from .models import Musician, MusicianAudio, MusicianVideo

class SignupForm(account.forms.SignupForm):

    field_order = [
        'email',
        'password',
    ]

    def __init__(self, *args, **kwargs):
        super(SignupForm, self).__init__(*args, **kwargs)
        del self.fields["username"]
        del self.fields["password_confirm"]


class MusicianForm(ModelForm):

    class Meta:
        model = Musician
        fields = [
            'image',
            'image_hero',
            'stage_name',
            'hometown',
            'on_tour',
            'website',
            'bio',
            'bio_short',
            'facebook',
            'twitter',
            'instagram',
            'youtube',
            'soundcloud',
            'bandcamp',
            'spotify',
        ]
        labels = {
            "bio_short": "Short Bio",
            "facebook": "ex. https://www.facebook.com/opuslivemusic/",
            "twitter": "ex. https://twitter.com/chrishnry",
            "instagram": "ex. https://www.instagram.com/chrishnry/",
            "spotify": "ex. https://open.spotify.com/artist/54tv11ndFfiqXiR03PwdlB"
        }
        widgets={
            'on_tour': forms.CheckboxInput()
        }



class MusicianAudioForm(forms.ModelForm):

    class Meta:
        model = MusicianAudio
        exclude = ('musician',)

    def __init__(self, *args, **kwargs):

        self.musician_id = kwargs['musician_id']
        del kwargs['musician_id']

        super(MusicianAudioForm, self).__init__(*args, **kwargs)


    def save(self, commit=True):
        instance = super(MusicianAudioForm, self).save(commit=False)
        instance.musician_id = self.musician_id

        if commit:
            instance.save()
        return instance


BaseMusicianAudioFormSet = modelformset_factory(MusicianAudio, form=MusicianAudioForm, can_delete=True)

class MusicianAudioFormSet(BaseMusicianAudioFormSet):

    def __init__(self, *args, **kwargs):
        #  create a musician attribute and take it out from kwargs
        # so it doesn't mess up with the other formset kwargs
        self.musician_id = kwargs['musician_id']
        del kwargs['musician_id']

        super(MusicianAudioFormSet, self).__init__(*args, **kwargs)

    def _construct_form(self, *args, **kwargs):
        # inject user in each form on the formset
        kwargs['musician_id'] = self.musician_id
        return super(MusicianAudioFormSet, self)._construct_form(*args, **kwargs)



class MusicianVideoForm(forms.ModelForm):

    class Meta:
        model = MusicianVideo
        exclude = ('musician',)

    def __init__(self, *args, **kwargs):

        self.musician_id = kwargs['musician_id']
        del kwargs['musician_id']

        super(MusicianVideoForm, self).__init__(*args, **kwargs)


    def save(self, commit=True):
        instance = super(MusicianVideoForm, self).save(commit=False)
        instance.musician_id = self.musician_id

        if commit:
            instance.save()
        return instance


BaseMusicianVideoFormSet = modelformset_factory(MusicianVideo, form=MusicianVideoForm, can_delete=True)

class MusicianVideoFormSet(BaseMusicianVideoFormSet):

    def __init__(self, *args, **kwargs):
        #  create a musician attribute and take it out from kwargs
        # so it doesn't mess up with the other formset kwargs
        self.musician_id = kwargs['musician_id']
        del kwargs['musician_id']

        super(MusicianVideoFormSet, self).__init__(*args, **kwargs)

    def _construct_form(self, *args, **kwargs):
        # inject user in each form on the formset
        kwargs['musician_id'] = self.musician_id
        return super(MusicianVideoFormSet, self)._construct_form(*args, **kwargs)

