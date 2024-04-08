from django.test import TestCase
from data_processing import get_drug_consumption_by_category

from csv_parser.csv_parser import Parser


class TestParser(TestCase):

    def setUp(self) -> None:
        # Populating the test database with the CSV data
        parser = Parser()
        parser.csv_to_database()

    def test_get_drug_consumption_by_age_default_args(self):
        data = get_drug_consumption_by_category(
            category="age", value="18-24", drug="meth"
        )

        self.assertEqual(data["age_range"], "18-24")
        self.assertEqual(data["drug"], "meth")
        self.assertEqual(data["data"]["never used"], 425)

    def test_get_consumption_by_gender(self):
        data = get_drug_consumption_by_category(
            category="gender",
            value="male",
            drug="meth",
        )

        self.assertEqual(data["gender"], "male")
        self.assertEqual(data["drug"], "meth")
        self.assertEqual(data["data"]["never used"], 640)
