from django.db import connection
from django.core.management.base import BaseCommand

from ... import csv_parser
from data_processing import personality_drug_correlation_matrix
from data_processing import all_features_to_drugs_mean_correlation


def tables_are_already_filled(tables: list[str]):
    """
    Function that takes a list of table names as parameters and returns the list of tables that are not filled.
    
    """
    not_filled_tables = []
    for table_name in tables:
        with connection.cursor() as cursor:
            cursor.execute(f"SELECT COUNT(*) FROM {table_name}")
            if cursor.fetchone()[0] == 0:
                not_filled_tables.append(table_name)

    return not_filled_tables


class Command(BaseCommand):
    help = "Parse the CSV file and insert its content into the database."

    def handle(self, *args, **options):

        data_tables = ["endpoints_respondent", "endpoints_correlationtodrug", "endpoints_meancorrelationtofeature"]

        missing_tables = [table for table in data_tables if table not in connection.introspection.table_names()]

        if any(missing_tables):
            missing_table = "\n- ".join(missing_tables)
            print(f"\nThe following tables are missing:\n\n- {missing_table}.\n\nPlease run the migrations first:\n\n>> python manage.py makemigrations\n>> python manage.py migrate\n")
            return

        non_filled_tables = tables_are_already_filled(data_tables)

        if len(non_filled_tables) == 0:
            print("The database is already filled and the correlations computed.")
        
        else:
            print("Filling the database with the CSV file ...")
            parser = csv_parser.Parser()
            parser.csv_to_database()
            print("Success.")
        
            print("Computing the correlation matrix ...")
            personality_drug_correlation_matrix.save_correlation_matrix()
            print("Success.")

            print("Computing the mean correlation to each feature ...")
            all_features_to_drugs_mean_correlation.save_all_features_to_drugs_mean()
            print("Success.")