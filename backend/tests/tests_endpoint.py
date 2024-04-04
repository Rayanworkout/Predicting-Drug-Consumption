from django.test import TestCase, Client
from csv_parser.csv_parser import Parser


class TestConsumptionByAge(TestCase):

    def setUp(self) -> None:
        self.client = Client()

        self.BASE_URL = "/api/"

        # Populating the test database with the CSV data
        parser = Parser()
        parser.csv_to_database()

    def test_endpoint_is_working(self):
        response = self.client.get(self.BASE_URL + "consumption_by_age")
        self.assertEqual(response.status_code, 200)

    def test_url_not_found(self):
        response = self.client.get(self.BASE_URL + "bad_url")
        self.assertEqual(response.status_code, 404)

    def test_bad_age_range(self):
        response = self.client.get(
            self.BASE_URL + "consumption_by_age?age_range=bad_range&drug=Alcohol"
        )
        self.assertEqual(response.status_code, 400)

    def test_bad_drug(self):
        response = self.client.get(
            self.BASE_URL + "consumption_by_age?age_range=18-24&drug=bad_drug"
        )
        self.assertEqual(response.status_code, 400)

    def test_consumption_by_age(self):
        response = self.client.get(
            self.BASE_URL + "consumption_by_age?age_range=18-24&drug=alcohol"
        )
        self.assertEqual(response.status_code, 200)

        self.assertEqual(
            response.json(),
            {
                "age_range": "18-24",
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
        response = self.client.get(self.BASE_URL + "consumption_by_age")
        self.assertEqual(response.status_code, 200)

        self.assertEqual(
            response.json(),
            {
                "age_range": "18-24",
                "drug": "meth",
                "data": {
                    "used in last day": 31,
                    "used in last week": 24,
                    "used in last year": 94,
                    "used in last month": 30,
                    "never used": 425,
                    "used in last decade": 38,
                    "used over a decade ago": 1,
                },
            },
        )

    def test_consumption_by_age_with_custom_values(self):
        response = self.client.get(
            self.BASE_URL + "consumption_by_age?age_range=25-34&drug=alcohol"
        )
        self.assertEqual(response.status_code, 200)

        self.assertEqual(
            response.json(),
            {
                "age_range": "25-34",
                "drug": "alcohol",
                "data": {
                    "used in last day": 123,
                    "used in last week": 209,
                    "used in last year": 52,
                    "used in last month": 70,
                    "never used": 9,
                    "used in last decade": 15,
                     "used over a decade ago": 3,

                },
            },
        )


class TestPopulationRepartition(TestCase):

    def setUp(self) -> None:
        self.client = Client()

        self.BASE_URL = "/api/"

        # Populating the test database with the CSV data
        parser = Parser()
        parser.csv_to_database()

    def test_endpoint_is_working(self):
        response = self.client.get(self.BASE_URL + "population_repartition")
        self.assertEqual(response.status_code, 200)

    def test_url_not_found(self):
        response = self.client.get(self.BASE_URL + "bad_url")
        self.assertEqual(response.status_code, 404)

    def test_bad_population(self):
        response = self.client.get(
            self.BASE_URL + "population_repartition?population=bad_population"
        )
        self.assertEqual(response.status_code, 400)

    def test_population_repartition_age(self):
        response = self.client.get(
            self.BASE_URL + "population_repartition?population=age"
        )
        self.assertEqual(response.status_code, 200)

        self.assertEqual(
            response.json(),
            {
                "data": [
                    {"age": "18-24", "count": 643},
                    {"age": "25-34", "count": 481},
                    {"age": "35-44", "count": 356},
                    {"age": "45-54", "count": 294},
                    {"age": "55-64", "count": 93},
                    {"age": "65+", "count": 18},
                ]
            },
        )

    def test_population_repartition_country(self):
        response = self.client.get(
            self.BASE_URL + "population_repartition?population=country"
        )
        self.assertEqual(response.status_code, 200)

        self.assertEqual(
            response.json(),
            {
                "data": [
                    {"country": "uk", "count": 1044},
                    {"country": "usa", "count": 557},
                    {"country": "other", "count": 118},
                    {"country": "canada", "count": 87},
                    {"country": "australia", "count": 54},
                    {"country": "republic of ireland", "count": 20},
                    {"country": "new zealand", "count": 5},
                ]
            },
        )

    def test_population_repartition_education(self):
        response = self.client.get(
            self.BASE_URL + "population_repartition?population=education"
        )
        self.assertEqual(response.status_code, 200)

        self.assertEqual(
            response.json(),
            {
                "data": [
                    {
                        "education": "some college,no certificate or degree",
                        "count": 506,
                    },
                    {"education": "university degree", "count": 480},
                    {"education": "masters degree", "count": 283},
                    {"education": "professional certificate/ diploma", "count": 270},
                    {"education": "left school at 18 years", "count": 100},
                    {"education": "left school at 16 years", "count": 99},
                    {"education": "doctorate degree", "count": 89},
                    {"education": "left school at 17 years", "count": 30},
                    {"education": "left school before 16 years", "count": 28},
                ]
            },
        )

    def test_population_repartition_gender(self):
        response = self.client.get(
            self.BASE_URL + "population_repartition?population=gender"
        )
        self.assertEqual(response.status_code, 200)

        self.assertEqual(
            response.json(),
            {
                "data": [
                    {"gender": "male", "count": 943},
                    {"gender": "female", "count": 942},
                ]
            },
        )
