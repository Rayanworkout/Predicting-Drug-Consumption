# Personality Traits and Drug Consumption: A Data Analysis

_Project currently under development_

### TLDR; this Django Ninja / React App is a simple interactive case study on the relationship between drug consumption and personality traits.

App is available at http://194.135.81.27/

### Introduction

The relationship between personality traits and drug consumption has long been a subject of interest in psychological and sociological studies. This project aims to explore this relationship by analyzing [a dataset of 1,885 respondents'](https://www.kaggle.com/datasets/mexwell/drug-consumption-classification/data) drug consumption habits and personality traits.

Using data from the _NEO-FFI-R_ personality test and additional information such as **age**, **ethnicity**, **gender**, **education level**, and **country of residence**, we investigate which personality traits are most correlated with the consumption of various legal and illegal drugs. The ultimate goal is to predict which characteristics of an individual make them more likely to consume drugs frequently, which can be valuable for drug prevention programs and policy-making.

In this repository, you will find:

**- Data Analysis**: Exploring the distribution of drug consumption among different age groups, genders, and other non-personality related features.

**- Correlation Analysis**: Using a correlation matrix to identify the strongest correlations between personality traits and drug consumption.

**- Results and Insights**: Observations and findings from the analysis, highlighting key features that influence drug consumption patterns.

Project made by [Sharnalk](https://github.com/Sharnalk), [L7Rayan](https://github.com/l7rayan) and me.

If you're interested about the data processing and analysis, you can check the notebooks at [`backend/notebooks`](/backend/notebooks/README.md). Each one is documented and commented, as well as all the endpoints necessary to this project.

Tech Stack / Features:
 - [Django Ninja API](https://django-ninja.dev/)
 - React Frontend
 - Data Plotting using [Apex Charts](https://apexcharts.com/)
 - CI/CD with GitHub Actions and a self made deployment pipeline [(see `ci_cd` folder)](/ci_cd/README.md)
 - 92% backend test coverage
 - Load tests with [Locust](https://locust.io/)
 - Frontend Performance tests with [Lighthouse](https://developers.google.com/web/tools/lighthouse)


_Note: Any guidance, suggestions, or collaboration is warmly welcomed and greatly appreciated ♥️_


## How to run locally ?

_You need to have Python >3.10 installed on your machine_

1. Clone the repository

```bash
git clone https://github.com/Rayanworkout/Predicting-Drug-Consumption.git
cd Predicting-Drug-Consumption
```


#### Linux users

Run [`local_run.sh`](/local_run.sh) script to start the backend and frontend servers. The script will create a virtual environment, install the necessary packages, and start the servers.
    
```bash
chmod +x local_run.sh
./local_run.sh
```

Or you can do it manually by running these commands one after each other:

```bash
cd ./backend/
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python3 manage.py migrate
python3 manage.py fill_database
mv .env.example .env

python manage.py runserver
```

#### Windows users

First rename `backend/.env.example` to `.env`

```bash
py -m venv .venv
.venv/Scripts/activate
pip install -r requirements.txt
py manage.py migrate
py manage.py fill_database
py manage.py runserver
```

#### Both Linux and Windows users
In another terminal:

```bash
# Frontend

cd ./frontend/
npm install
npm run dev
```

Both backend and frontend should be running.

After everything is setup for the first time, you can just run the server with `python3 manage.py runserver` (`py manage.py runserver` on Windows) for the backend and `npm run dev` for the frontend.

Now you can either:
- Access the app at http://localhost:5173/
- Access the API documentation at http://127.0.0.1:8000/api/docs
- Run the backend tests by stopping the server and running `python3 manage.py test` (or `py manage.py test` on Windows)