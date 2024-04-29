#!/bin/bash

# sudo journalctl -u drug_app_webhook_listener.service --since today
# or for live logs
# sudo journalctl -u drug_app_webhook_listener.service --since today -f

# Apache logs
# cat /var/log/apache2/backend-error.log

# THIS FILE MUST BE IN THE ROOT DIRECTORY OF THE PROJECT

# Telegram bot token and chat id
telegram_bot_token="TOKEN"
telegram_chat_id="CHAT_ID"

# If script is called through webhook, we notify the admin
# with a telegram message
if [ "$1" = "verbose" ]; then
    msg=$(jq -rn --arg x "New commit on main, initiating pipeline ..." '$x|@uri')
    tg_url="https://api.telegram.org/bot$telegram_bot_token/sendMessage?chat_id=$telegram_chat_id&text=$msg"
    resp=$(curl -s "$tg_url")
fi

echo "> Pulling changes ..."

# We reset first because we want to discard any local changes
# otherwise the pull will fail
sudo git reset --hard

# Using a variable to capture the error message
output=$(sudo git pull origin main 2>&1)

# If there is an errore while pulling (conflict)
# we abort the script and notify the admin
if [[ $output == *"Aborting"* ]]; then
    msg=$(jq -rn --arg x "An error occurred. $output" '$x|@uri')
    tg_url="https://api.telegram.org/bot$telegram_bot_token/sendMessage?chat_id=$telegram_chat_id&text=$msg"
    resp=$(curl -s "$tg_url")
    echo "> Error: $output"
    exit 1
fi

echo "> Done"

# For the next steps, we need to stop if an error occurs
set -e


# BACKEND

cd ../../backend/

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


# FRONTEND

echo "> Installing frontend dependencies ..."
cd ../frontend/

sudo npm install

echo "> Done"

echo "> Building frontend ..."
sudo npm run build > /dev/null

echo "> Fixing permissions ..."

cd ../..

# Apache needs to have access to the files
sudo chown -R www-data:www-data ./Predicting-Drug-Consumption
sudo chmod -R 755 ./Predicting-Drug-Consumption

echo "> Done"

echo "> Restarting Apache ..."

sudo systemctl reload apache2.service

echo "> Done, check website at http://194.135.81.27/"

# If script is called through webhook, we notify the admin
# with a telegram message
if [ "$1" = "verbose" ]; then
    msg=$(jq -rn --arg x "Last build of 'drug consumption project' was successful" '$x|@uri')
    tg_url="https://api.telegram.org/bot$telegram_bot_token/sendMessage?chat_id=$telegram_chat_id&text=$msg"
    resp=$(curl -s "$tg_url")
fi