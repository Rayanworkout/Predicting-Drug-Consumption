import os
import pandas as pd

from django.test import TestCase
from csv_parser.csv_parser import Parser

from endpoints.models import Respondent


class TestParser(TestCase):

    def setUp(self) -> None:
        self.parser = Parser()

    ############ INIT ############
    def test_file_not_found_error(self):
        with self.assertRaises(FileNotFoundError):
            _ = Parser(file_path="not_existing.csv")

    def test_default_file_path(self):
        current_directory = os.path.dirname(__file__)
        previous_directory = os.path.dirname(current_directory)
        self.assertEqual(
            self.parser.file_path,
            os.path.join(previous_directory, "csv_parser", "drug_consumption.csv"),
        )

    ############ PARSE_CSV ############
    def test_parse_csv(self):
        df = self.parser._Parser__parse_csv()
        self.assertIsInstance(df, pd.DataFrame)
        self.assertEqual(df.shape, (1885, 32))

    def test_clean_dataframe(self):
        df = self.parser._Parser__parse_csv()
        df = self.parser._Parser__generate_clean_dataframe(df)
        self.assertEqual(df.shape, (1885, 32))
        self.assertFalse(df.isnull().values.any())
        self.assertFalse(df.duplicated().any())

    ############ CSV_TO_DATABASE ############
    def test_csv_to_database(self):
        self.parser.csv_to_database()
        self.assertEqual(Respondent.objects.count(), 1885)
