from .base import *

import urllib
import dj_database_url

DATABASES = {}
DATABASES['default'] = dj_database_url.parse(
    "mysql://booking_stage:{}@booking-stage.cuo6krbubjof.us-east-2.rds.amazonaws.com:3306/booking_stage".format(urllib.parse.quote_plus("A;vj,ayDF7hUJ2V$V[}9yZPx")),
    conn_max_age=0
)

SITE_DOMAIN = 'booking-stage-1029564567.us-east-2.elb.amazonaws.com'
ALLOWED_HOSTS = [
    SITE_DOMAIN,
    "*"
]

