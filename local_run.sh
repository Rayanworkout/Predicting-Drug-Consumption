#!/bin/bash

# THIS FILE IS INTENDED TO RUN THE PROJECT ON A LINUX ENVIRONMENT

# You need to make this file executable by running
# chmod +x local_run.sh

# For the next steps, we need to stop if an error occurs
set -e


# BACKEND

cd ./backend/

# Check if python venv exists, if not create it
if [ ! -d './.venv' ]; then
    echo 'venv does not exist, creating ...'
    python3 -m venv .venv
fi

source .venv/bin/activate

echo "> Installing dependencies ..."
pip install -r requirements.txt > /dev/null
echo "> Done"

echo "> Migrating database ..."
python3 manage.py makemigrations

python3 manage.py migrate

echo "> Done"

python3 manage.py fill_database

mv .env.example .env

echo "> Running backend ..."

python3 manage.py runserver &


# FRONTEND

echo "> Installing frontend dependencies ..."
cd ../frontend/

npm install

echo "> Done"

echo "> Running frontend ..."
npm run dev

echo "> Done"