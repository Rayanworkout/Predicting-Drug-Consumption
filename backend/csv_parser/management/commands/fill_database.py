from django.db import connection
from django.core.management.base import BaseCommand
from ... import csv_parser


def table_exists(table_name):
    return table_name in connection.introspection.table_names()


def table_is_already_filled(table_name):
    with connection.cursor() as cursor:
        cursor.execute(f"SELECT COUNT(*) FROM {table_name}")
        row_count = cursor.fetchone()[0]

    return row_count > 0


class Command(BaseCommand):
    help = "Parse the CSV file and insert its content into the database."

    def handle(self, *args, **options):
        if not table_exists("api_respondent"):
            print("The table is not created yet. Please run the migrations first.")
            return

        elif table_is_already_filled("api_respondent"):
            print("The database is already filled with the CSV file.")
            return

        else:
            print("Filling the database with the CSV file...")
            parser = csv_parser.Parser()
            parser.csv_to_database()
            print("Data successfully saved to the database.")
