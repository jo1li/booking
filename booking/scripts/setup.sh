#!/bin/bash -e


echo "ls /"
ls /

echo "ls /cloudsql/"
ls /cloudsql/

echo ""

cd /app/

# ./scripts/wait-for-it.sh $MYSQL_HOST:$MYSQL_PORT --timeout=30 --strict -- echo "DB is up!!!1!!"

# Run migrations
python manage.py migrate --noinput

# Move static assets into place
python manage.py collectstatic --noinput

# Load fixture data, but only locally
if [ "$DJANGO_SETTINGS_MODULE" == "booking.settings.dev" ]
then
    echo "Fixturizing!!!1!"
    python manage.py loaddata fixtures/auth.user.json
fi
