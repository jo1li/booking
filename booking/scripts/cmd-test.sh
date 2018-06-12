#!/bin/bash -e

cd /app/

./scripts/setup.sh --skip-collect

time ./manage.py test --keepdb "$@"
