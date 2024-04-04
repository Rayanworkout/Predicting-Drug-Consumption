from django.test import TestCase
from data_processing import get_drug_consumption_by_age

from csv_parser.csv_parser import Parser


class TestParser(TestCase):

    def setUp(self) -> None:
        parser = Parser()

        parser.csv_to_database()

    def test_get_drug_consumption_by_age(self):
        data = get_drug_consumption_by_age()

        print(data)
