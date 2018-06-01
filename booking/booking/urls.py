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
from django.urls import path, include

from django.conf import settings
from django.conf.urls.static import static

from rest_framework import routers

from home.views import index, healthcheck, logout, LoginView, about, privacy, terms

from venues.views_admin import create
from musicians.views import SignupView, ArtistViewSet

from .utils import v_url

# Routers provide an easy way of automatically determining the URL conf.
router = routers.DefaultRouter()
router.register(v_url('artists'), ArtistViewSet, base_name='artist')

urlpatterns = [
    path('', include(router.urls)),
    path('', index, name="home"),
    path('', include('social_django.urls', namespace='social')),
    path('about', about, name="about"),
    path('privacy', privacy, name="privacy"),
    path('privacy-2', privacy, name="privacy"),
    path('terms', terms, name="terms"),
    path('_ah/health', healthcheck),
    path('opus-control/booking-agent/create/', create, name="admin_booking_agent_create"),
    path('opus-control/', admin.site.urls),
    path('account/log_out/', logout, name="opus_logout"),
    path('account/login/', LoginView.as_view(), name="opus_login"),
    path('account/signup/', SignupView.as_view(), name="opus_signup"),
    path('account/', include("account.urls")),
    path('m/',  include('musicians.urls')),
    path('v/',  include('venues.urls')),
    path('api-auth/', include('rest_framework.urls'))
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
