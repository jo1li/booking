from django.forms import ModelForm
from django import forms
from django.forms import modelformset_factory

import account.forms

from .models import Musician, MusicianAudio

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
        exclude = ()

    def __init__(self, *args, **kwargs):
        super(MusicianAudioForm, self).__init__(*args, **kwargs)


BaseMusicianAudioFormSet = modelformset_factory(MusicianAudio, form=MusicianAudioForm, can_delete=True)

class MusicianAudioFormSet(BaseMusicianAudioFormSet):

    def __init__(self, *args, **kwargs):
        #  create a musician attribute and take it out from kwargs
        # so it doesn't messes up with the other formset kwargs
        super(MusicianAudioFormSet, self).__init__(*args, **kwargs)

    def _construct_form(self, *args, **kwargs):
        # inject user in each form on the formset
        return super(MusicianAudioFormSet, self)._construct_form(*args, **kwargs)
