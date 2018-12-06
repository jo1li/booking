#!/bin/bash -e

cd /app/

if [ "$DJANGO_SETTINGS_MODULE" == "booking.settings.dev" ]
then
    ./scripts/wait-for-it.sh $MYSQL_HOST:$MYSQL_PORT --timeout=30 --strict -- echo "DB is up!!!1!!"
fi

# TODO: set this up a bit better
if [ "$DJANGO_SETTINGS_MODULE" == "booking.settings.stage_aws" ]
then
    ./scripts/wait-for-it.sh booking-stage.cuo6krbubjof.us-east-2.rds.amazonaws.com:3306 --timeout=30 --strict -- echo "DB is up!!!1!!"
fi

if [ "$DJANGO_SETTINGS_MODULE" == "booking.settings.prod_aws" ]
then
    ./scripts/wait-for-it.sh booking-prod.cuo6krbubjof.us-east-2.rds.amazonaws.com:3306 --timeout=30 --strict -- echo "DB is up!!!1!!"
fi

# Run migrations
python manage.py migrate --noinput

echo "Loading initial tags!!1!"
python manage.py initial_tags

# Move static assets into place
if [[ $* != *--skip-collect* ]]
then
    python manage.py compilescss
    python manage.py collectstatic --noinput -i node_modules
else
    echo "Skipping collect 4 speedzz!!!1!"
fi

# Load fixture data, but not in prod
if [ "$DJANGO_SETTINGS_MODULE" != "booking.settings.prod_aws" ]
then
    echo "Fixturizing!!!1!"
    python manage.py loaddata fixtures/home.opususer.json
    python manage.py loaddata fixtures/musicians.json
fi
