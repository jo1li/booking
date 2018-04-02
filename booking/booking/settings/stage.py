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

# Stage-specific social config
SOCIAL_AUTH_FACEBOOK_KEY = '543204189394787'
SOCIAL_AUTH_FACEBOOK_SECRET = '9358f09ea171a461d963d357c837bea0'

SOCIAL_AUTH_INSTAGRAM_KEY = '03270c0095e2451ca9c91403e6f7239b'
SOCIAL_AUTH_INSTAGRAM_SECRET = '4c420cac3ba946e192fa99ddca3ca575'
