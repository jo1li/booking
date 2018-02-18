#!/bin/bash -ex

cd /app/

env

./scripts/setup.sh

# Run the app
gunicorn booking.wsgi -c booking/gunicorn.py
