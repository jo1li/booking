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
            'stage_name',
            'hometown',
            'on_tour',
            'website',
            'bio',
            'facebook',
            'twitter',
            'instagram',
            'youtube',
            'soundcloud',
            'bandcamp',
            'spotify',
        ]
        widgets={
            'on_tour': forms.CheckboxInput()
        }
