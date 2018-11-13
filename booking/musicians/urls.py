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

from .views import artist_onboarding, profile, profile_template, dashboard, editor, editor_audio, editor_video, settings, venue_questions, social, api_test, artists_coming_soon, venues_coming_soon

urlpatterns = [
    path('api_test', api_test, name="api_test"),
    path('dashboard', dashboard, name="musician_dash"),
    path('editor', editor, name="musician_editor"),
    path('editor/audio', editor_audio, name="musician_editor_audio"),
    path('editor/video', editor_video, name="musician_editor_video"),
    path('social', social, name="musician_social"),
    path('settings', settings, name="musician_settings"),
    path('venue_questions', venue_questions, name="musician_app_venue_questions"),
    path('template', profile_template, name="musician_profile_template"),
    path('onboarding', artist_onboarding, name="artist_onboarding"),
    path('artists', artists_coming_soon, name="artists"),
    path('venues', venues_coming_soon, name="venues"),
    path('<slug>', profile, name="musician_profile"),
]
