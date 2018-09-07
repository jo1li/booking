from django.contrib import admin
from django.contrib.admin.sites import AdminSite

from venues.models import *

class VenueAdmin(admin.ModelAdmin):
    list_display = ['title', 'address_string']


class BookingAgentAdmin(admin.ModelAdmin):
    pass


class EventAdmin(admin.ModelAdmin):
    pass


class SlotAdmin(admin.ModelAdmin):
    pass


class ApplicationAdmin(admin.ModelAdmin):
    pass


admin.site.register(Venue, VenueAdmin)
admin.site.register(BookingAgent, BookingAgentAdmin)
admin.site.register(Event, EventAdmin)
admin.site.register(Slot, SlotAdmin)
admin.site.register(Application, ApplicationAdmin)


AdminSite.index_template = "v1/admin/index.html"
