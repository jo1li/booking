from django.contrib import admin

from home.models import OpusUser

class OpusUserAdmin(admin.ModelAdmin):
    pass

# Register your models here.
admin.site.register(OpusUser, OpusUserAdmin)
