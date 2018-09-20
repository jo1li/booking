from booking.utils import opus_render

from .models import Venue, Event, Slot
from .serializers import VenueListSerializer, VenueSerializer, EventSerializer, SlotSerializer

from rest_framework import viewsets, mixins, permissions
from rest_framework.parsers import JSONParser


class VenueViewSet(mixins.ListModelMixin,
                    mixins.RetrieveModelMixin,
                    viewsets.GenericViewSet):
    """
    GET /v1/venues/:
    Return a list of all the existing venues.

    GET /v1/venues/<id>:
    Retrieve a single venue instance.

    PUT /v1/venues/<id>:
    Update a single venue instance.

    To upload `image` and `image_hero` the API call must be sent as a MultiPartForm
        https://stackoverflow.com/questions/4526273/what-does-enctype-multipart-form-data-mean

    Note: genres should be comma delimited, in the format described http://radiac.net/projects/django-tagulous/documentation/parser/
        When this call returns, it will return a string, but Get calls will return an array of objects.
    """

    parser_classes = (JSONParser,)
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

    queryset = Venue.objects.all()
    serializer_class = VenueListSerializer


    def list(self, *args, **kwargs):
        self.serializer_class = VenueListSerializer
        return mixins.ListModelMixin.list(self, *args, **kwargs)


    def retrieve(self, *args, **kwargs):
        self.serializer_class = VenueSerializer
        return mixins.RetrieveModelMixin.retrieve(self, *args, **kwargs)


class SlotViewSet(mixins.ListModelMixin,
                    mixins.RetrieveModelMixin,
                    viewsets.GenericViewSet):
    """
    GET /v1/slots/:
    Return a list of all the existing slots.

    GET /v1/slots/<id>:
    Retrieve a single slot instance.

    PUT /v1/slots/<id>:
    Update a single slot instance.
    """

    parser_classes = (JSONParser,)
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

    queryset = Slot.objects.all()
    serializer_class = SlotSerializer


class EventViewSet(mixins.ListModelMixin,
                    mixins.RetrieveModelMixin,
                    viewsets.GenericViewSet):
    """
    GET /v1/slots/:
    Return a list of all the existing slots.

    GET /v1/slots/<id>:
    Retrieve a single slot instance.

    PUT /v1/slots/<id>:
    Update a single slot instance.
    """

    parser_classes = (JSONParser,)
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

    queryset = Event.objects.all()
    serializer_class = EventSerializer


# Create your views here.
def profile(request, slug=None):
    return opus_render(request, "venues/profile.html")


def dates(request, slug=None):
    return opus_render(request, "venues/dates.html")


def event(request, venue_slug=None, event_slug=None):
    return opus_render(request, "venues/event.html")


def dashboard(request):
    return opus_render(request, "venues/dashboard.html", {
            'range': range(10)
        })


def embeds(request):
    return opus_render(request, "venues/embeds.html")


def settings(request):
    return opus_render(request, "venues/settings.html")


def editor(request):
    return opus_render(request, "venues/editor.html")


def event_editor(request):
    return opus_render(request, "venues/event_editor.html")


def landing(request):
    return opus_render(request, "venues/landing.html")


def welcome(request):
    return opus_render(request, "venues/welcome.html")


def pretend_venue_site(request):
    return opus_render(request, "venues/pretend_venue_site.html")
