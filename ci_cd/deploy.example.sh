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
git pull origin main
echo "> Done"

source .venv/bin/activate

echo "> Installing dependencies ..."
pip install -r requirements.txt
echo "> Done"


py manage.py makemigrations

py manage.py migrate

py manage.py fill_database

py manage.py runserver