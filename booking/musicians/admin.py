from django.contrib import admin

from musicians.models import *

class MusicianAdmin(admin.ModelAdmin):
    pass


class MusicianAudioAdmin(admin.ModelAdmin):
    pass

# Register your models here.
admin.site.register(Musician, MusicianAdmin)
admin.site.register(MusicianAudio, MusicianAudioAdmin)
