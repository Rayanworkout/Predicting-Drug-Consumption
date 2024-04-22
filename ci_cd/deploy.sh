#!/bin/bash

# journalctl -u flask_listener.service --since today
# or
# journalctl -u flask_listener.service --since today -f


# This file must be in the root directory of the project

# Stop if an error occurs
set -e

# Telegram bot token and chat id
telegram_bot_token="BOT_TOKEN"
telegram_chat_id="CHAT_ID"

echo "> Pulling changes ..."
# git pull origin main
echo "> Done"


# BACKEND

cd ./backend/
source .venv/bin/activate

echo "> Installing dependencies ..."
pip install -r requirements.txt
echo "> Done"

echo "> Migrating database ..."
python3 manage.py makemigrations

python3 manage.py migrate

echo "> Done"

echo "> Filling database ..."
python3 manage.py fill_database

# Running backend server in the background
python3 manage.py runserver &

echo "> Done"

# FRONTEND

echo "> Installing frontend dependencies ..."
cd ../frontend/

npm install

echo "> Done"

echo "> Building frontend ..."
npm run build

echo "> Done"