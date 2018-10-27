from .base import *

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    }
}

SITE_DOMAIN = 'booking-stage-1029564567.us-east-2.elb.amazonaws.com'
ALLOWED_HOSTS = [
    SITE_DOMAIN,
    "*"
]

