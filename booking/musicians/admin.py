from django.contrib import admin
from django.urls import reverse
from django.utils.html import format_html

import tagulous

from musicians.models import *


class MusicianAdmin(admin.ModelAdmin):
    list_display = ['stage_name', 'url_fq_html', 'on_tour']

    def url_fq_html(self, obj):
        return format_html(
            '<a href="{url}">{url}</a>',
            url=reverse('musician_profile', kwargs={'slug': obj.slug})
        )

class MusicianAudioAdmin(admin.ModelAdmin):
    list_display = ['musician', 'order']


class MusicianVideoAdmin(admin.ModelAdmin):
    list_display = ['musician', 'order']


class MusicianPhotoAdmin(admin.ModelAdmin):
    list_display = ['musician', 'order']

# Register your models here.
tagulous.admin.register(GenreTag)
tagulous.admin.register(Musician, MusicianAdmin)
admin.site.register(MusicianAudio, MusicianAudioAdmin)
admin.site.register(MusicianVideo, MusicianVideoAdmin)
admin.site.register(MusicianImage, MusicianPhotoAdmin)
