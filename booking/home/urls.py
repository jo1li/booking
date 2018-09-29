from django.urls import path

from .views import index, healthcheck, logout, LoginView, about, privacy, terms

urlpatterns = [
    path('', index, name="home"),
    path('about', about, name="about"),
    path('privacy', privacy, name="privacy"),
    path('privacy-2', privacy, name="privacy"),
    path('terms', terms, name="terms"),
    path('_ah/health', healthcheck),
    path('account/log_out/', logout, name="opus_logout"),
    path('account/login/', LoginView.as_view(), name="opus_login"),
]
