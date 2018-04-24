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

SOCIAL_AUTH_INSTAGRAM_KEY = '62edec2cc7dd45f7a4c8c5f3b767d2c6'
SOCIAL_AUTH_INSTAGRAM_SECRET = 'dc0ec5c1edf54516a1fd4f6dd21d998c'
SOCIAL_INSTAGRAM_TOKEN = '32465610.1677ed0.28f4eddd9c5e41b2a8dc50d77fc281a3'

SOCIAL_TWITTER_CONSUMER_KEY = 'S5pewaBl5sB7rpUXnKRl8ysRZ'
SOCIAL_TWITTER_CONSUMER_SECRET = 'fKG8fOAwB3iiK72tTlyge7EBnlliHg1H5x60LUik743Om2EPUo'
SOCIAL_TWITTER_ACCESS_TOKEN = '30171536-GxwENbTPA2RF3Em1CiZ9VgZCAGpyDw4bQNWfmenuz'
SOCIAL_TWITTER_ACCESS_TOKEN_SECRET = 'oH8jw9RccbFKwQ9AgAvlnTNNxY3sjwzjxI1TTl1homk7c'

SOCIAL_AUTH_SPOTIFY_KEY = '86b659712186423082c0d5eb60c8bd81'
SOCIAL_AUTH_SPOTIFY_SECRET = '3077be4e7fa14e0d86e3feed71671025'
