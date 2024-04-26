#!/bin/bash

# sudo journalctl -u drug_app_webhook_listener.service --since today
# or
# sudo journalctl -u drug_app_webhook_listener.service --since today -f

# cat /var/log/apache2/backend-error.log

# THIS FILE MUST BE IN THE ROOT DIRECTORY OF THE PROJECT

# Telegram bot token and chat id
telegram_bot_token="TOKEN"
telegram_chat_id="CHAT_ID"

msg=$(jq -rn --arg x "New commit on main, initiating pipeline ..." '$x|@uri')
tg_url="https://api.telegram.org/bot$telegram_bot_token/sendMessage?chat_id=$telegram_chat_id&text=$msg"
resp=$(curl -s "$tg_url")

echo "> Pulling changes ..."

sudo git checkout -- .

# Using a variable to capture the error message
output=$(sudo git pull origin main 2>&1)

if [[ $output == *"Aborting"* ]]; then
    msg=$(jq -rn --arg x "An error occurred. $output" '$x|@uri')
    tg_url="https://api.telegram.org/bot$telegram_bot_token/sendMessage?chat_id=$telegram_chat_id&text=$msg"
    resp=$(curl -s "$tg_url")
    echo "> Error: $output"
    exit 1
fi

echo "> Done"

# Stop if an error occurs
set -e

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

# FRONTEND

echo "> Installing frontend dependencies ..."
cd ../frontend/

sudo npm install

echo "> Done"

echo "> Building frontend ..."
sudo npm run build

echo "> Fixing permissions ..."

cd ../..

sudo chown -R www-data:www-data ./Predicting-Drug-Consumption
sudo chmod -R 755 ./Predicting-Drug-Consumption

echo "> Done"

echo "> Restarting Apache ..."

sudo systemctl reload apache2.service

echo "> Done, check website at http://194.135.81.27/"


msg=$(jq -rn --arg x "Last build of 'drug consumption project' was successful" '$x|@uri')
tg_url="https://api.telegram.org/bot$telegram_bot_token/sendMessage?chat_id=$telegram_chat_id&text=$msg"
resp=$(curl -s "$tg_url")