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
from django.urls import path

from .views import *

urlpatterns = [
    path('pretend_venue_site', pretend_venue_site, name="pretend_venue_site"),
    path('welcome', welcome, name="venue_welcome"),
    path('dashboard', dashboard, name="venue_dashboard"),
    path('editor', editor, name="venue_editor"),
    path('event_editor', event_editor, name="event_editor"),
    path('settings', settings, name="venue_settings"),
    path('<slug>', profile, name="venue_profile"),
    path('<venue_slug>/e/<event_slug>', event, name="event_profile"),
]
