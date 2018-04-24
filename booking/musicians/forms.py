from django.forms import ModelForm
from django import forms
import account.forms

from .models import Musician


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
