#!/bin/bash

set -ex

# ensure containers are up
docker-compose up -d

# Run the react-scripts build
docker-compose exec web-js npm run build

# Grab the name of the file
JS_BUNDLE=$(ls -l booking/static/js/app/build/static/js/| grep "js$" | awk '{print $9}')

# Edit it into the app.yaml
sed -i '' "s/.*STATIC_JS_APP_BUNDLE.*/  STATIC_JS_APP_BUNDLE: $JS_BUNDLE/g" app.yaml

# Build dat shit
echo "y" | gcloud app deploy app.yaml --project opus-booking-stage

# Reset the gcloud config file
git checkout app.yaml
