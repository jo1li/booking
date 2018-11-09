from .base import *

# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.mysql',
#         'HOST': 'booking-prod.cuo6krbubjof.us-east-2.rds.amazonaws.com',
#         'NAME': 'booking_prod',
#         'PORT': '3306',
#         'USER': 'booking_prod',
#         'PASSWORD': 'a8mK9vU[RkAvzTc*Dm4M.>^E',
#         'OPTIONS': {
#             'init_command': "SET sql_mode='STRICT_TRANS_TABLES'",
#             # Tell MySQLdb to connect with 'utf8mb4' character set
#             'charset': 'utf8mb4'
#         }
#     },
# }

import os
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    }
}

SITE_DOMAIN = 'opuslive.io'
ALLOWED_HOSTS = [
    SITE_DOMAIN,
    "www.{}".format(SITE_DOMAIN),
    "*"
]

STATIC_JS_APP_BASE_URL = '/static/js/app/build/static/js/'

# Stage-specific social config
SOCIAL_AUTH_FACEBOOK_KEY = '543204189394787'
SOCIAL_AUTH_FACEBOOK_SECRET = '9358f09ea171a461d963d357c837bea0'

SOCIAL_AUTH_INSTAGRAM_KEY = '03270c0095e2451ca9c91403e6f7239b'
SOCIAL_AUTH_INSTAGRAM_SECRET = '4c420cac3ba946e192fa99ddca3ca575'

SOCIAL_AUTH_SPOTIFY_KEY = '01cf0c464a6b4e49955ebfa310d121fb'
SOCIAL_AUTH_SPOTIFY_SECRET = '6baa6f50cb054dd1ac5661faf8b6ac24'
