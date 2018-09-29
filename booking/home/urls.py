from django.urls import path

from .views import index, healthcheck, logout, LoginView, artists, venues, privacy, terms

urlpatterns = [
    path('', index, name="home"),
    path('artists/', artists, name="artists"),
    path('venues/', venues, name="venues"),
    path('privacy/', privacy, name="privacy"),
    path('privacy-2/', privacy, name="privacy"),
    path('terms/', terms, name="terms"),
    path('_ah/health', healthcheck),
    path('account/log_out/', logout, name="opus_logout"),
    path('account/login/', LoginView.as_view(), name="opus_login"),
]
