from .base import *

# Database
# https://docs.djangoproject.com/en/2.0/ref/settings/#databases

ALLOWED_HOSTS = [
    "localhost",
    "booking.localopuslive.io",
    "opus.ngrok.io"
]

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'HOST': get_env_variable('MYSQL_HOST'),
        'NAME': get_env_variable('MYSQL_DATABASE'),
        'PORT': get_env_variable('MYSQL_PORT'),
        'USER': get_env_variable('MYSQL_OPUS_USER'),
        'PASSWORD': get_env_variable('MYSQL_PASSWORD'),
    },
}

SITE_SSL_AVAILABLE = False
SITE_DOMAIN = 'localhost'

# Dev-specific social config
SOCIAL_AUTH_FACEBOOK_KEY = '232252310696134'
SOCIAL_AUTH_FACEBOOK_SECRET = 'e81a7510d5e7251a16f36bcbab17164a'
