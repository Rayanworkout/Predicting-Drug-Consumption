from django.test import TestCase, Client
from csv_parser.csv_parser import Parser


class TestConsumptionByAge(TestCase):

    def setUp(self) -> None:
        self.client = Client()

        self.BASE_URL = "/api/consumption/by_age/"

        # Populating the test database with the CSV data
        parser = Parser()
        parser.csv_to_database()

    def test_endpoint_is_working(self):
        response = self.client.get(self.BASE_URL + "?age_range=18-24&drug=alcohol")
        self.assertEqual(response.status_code, 200)

    def test_url_not_found(self):
        response = self.client.get(self.BASE_URL + "bad_url")
        self.assertEqual(response.status_code, 404)

    def test_bad_age_range(self):
        response = self.client.get(self.BASE_URL + "?age_range=bad_range&drug=Alcohol")
        self.assertEqual(response.status_code, 400)

    def test_bad_drug(self):
        response = self.client.get(self.BASE_URL + "?age_range=18-24&drug=bad_drug")
        self.assertEqual(response.status_code, 400)

    def test_consumption_by_age(self):
        response = self.client.get(self.BASE_URL + "?age_range=18-24&drug=alcohol")
        self.assertEqual(response.status_code, 200)

        self.assertEqual(
            response.json(),
            {
                "age_range": "18-24",
                "gender": None,
                "ethnicity": None,
                "drug": "alcohol",
                "data": {
                    "used in last day": 149,
                    "used in last week": 271,
                    "used in last year": 75,
                    "used in last month": 121,
                    "never used": 14,
                    "used in last decade": 13,
                },
            },
        )

    def test_consumption_by_age_with_default_values(self):
        response = self.client.get(self.BASE_URL)
        self.assertEqual(response.status_code, 422)

    def test_consumption_by_age_with_custom_values(self):
        response = self.client.get(self.BASE_URL + "?age_range=25-34&drug=alcohol")
        self.assertEqual(response.status_code, 200)
