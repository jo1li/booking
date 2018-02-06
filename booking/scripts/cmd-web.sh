#!/bin/bash -ex

cd /app/

./scripts/setup.sh

# Run the app
gunicorn booking.wsgi -c booking/gunicorn.py
