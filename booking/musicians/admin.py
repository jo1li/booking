from django.contrib import admin
import tagulous

from musicians.models import *

class MusicianAdmin(admin.ModelAdmin):
    list_display = ['stage_name', 'on_tour']


class MusicianAudioAdmin(admin.ModelAdmin):
    pass


class MusicianVideoAdmin(admin.ModelAdmin):
    pass

# Register your models here.
tagulous.admin.register(Genres)
tagulous.admin.register(Musician, MusicianAdmin)
admin.site.register(MusicianAudio, MusicianAudioAdmin)
admin.site.register(MusicianVideo, MusicianVideoAdmin)
