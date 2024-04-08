# Statistics and Analytics about the drug consumption


## How to launch server the first time (windows)

After cloning the repository, you need to install the dependencies and create the database. For that you need to have Python installed on your machine.
Follow the instructions below to launch the server:

First rename `.env.example` to `.env` and fill the variable `DJANGO_SECRET_KEY` with the secret key of your choice.

Then open a terminal and run the following commands:

```bash
py -m venv .venv
.venv/Scripts/activate
pip install -r requirements.txt
py manage.py makemigrations
py manage.py migrate
py manage.py fill_database
py manage.py runserver
```

You can now access the documentation at:
http://127.0.0.1:8000/api/docs

The second time you launch the server, you only need to run the following commands:

```bash
.venv/Scripts/activate
py manage.py runserver
```