from .base import *

ALLOWED_HOSTS = [
    'opus-booking-stage.appspot.com'
]

# Database
# https://docs.djangoproject.com/en/2.0/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'HOST': '/cloudsql/opus-booking-stage:us-central1:opus-booking-stage',
        'USER': get_env_variable('MYSQL_OPUS_USER'),
        'PASSWORD': get_env_variable('MYSQL_PASSWORD'),
        'NAME': get_env_variable('MYSQL_DATABASE'),
        'PORT': '3306'
    }
}

SITE_SSL_AVAILABLE = True
SITE_DOMAIN = 'opus-booking-stage.appspot.com'
