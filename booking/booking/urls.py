"""booking URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, re_path, include

from django.conf import settings
from django.conf.urls.static import static

from rest_framework_nested import routers as routers

from venues.views_admin import create

# Page views
from musicians.views import signup

# API Views
from musicians.views import SignupView, ArtistViewSet, ArtistVideoViewSet, ArtistAudioViewSet, ArtistImageViewSet, GenreTagViewSet
from venues.views import VenueViewSet, EventViewSet, SlotViewSet

from .utils import v_url

# Routers provide an easy way of automatically determining the URL conf.
top_router = routers.DefaultRouter()
top_router.register('artists', ArtistViewSet, base_name='artists')
top_router.register('venues',  VenueViewSet, base_name='venues')
top_router.register('genres',  GenreTagViewSet, base_name='genres')
top_router.register('slots',  SlotViewSet, base_name='slots')
top_router.register('events',  EventViewSet, base_name='events')

artist_router = routers.NestedSimpleRouter(top_router, r'artists', lookup='artist')
artist_router.register(r'videos', ArtistVideoViewSet, base_name='artist-videos')
artist_router.register(r'audios', ArtistAudioViewSet, base_name='artist-audios')
artist_router.register(r'photos', ArtistImageViewSet, base_name='artist-photos')

venue_router = routers.NestedSimpleRouter(top_router, r'venues', lookup='venue')


urlpatterns = [
    path('signup/', signup, name="opus_react_signup"),
    re_path(v_url(''), include(top_router.urls)),
    re_path(v_url(''), include(artist_router.urls)),
    re_path(v_url(''), include(venue_router.urls)),
    path('', include("home.urls")),
    path('', include('social_django.urls', namespace='social')),
    path('opus-control/booking-agent/create/', create, name="admin_booking_agent_create"),
    path('opus-control/', admin.site.urls),
    path('account/signup/', SignupView.as_view(), name="opus_signup"),
    path('account/', include("account.urls")),
    path('m/',  include('musicians.urls')),
    path('v/',  include('venues.urls')),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
