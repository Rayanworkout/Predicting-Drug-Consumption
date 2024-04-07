from django.test import TestCase, Client
from csv_parser.csv_parser import Parser


class TestConsumptionEndpoints(TestCase):

    def setUp(self) -> None:
        self.client = Client()

        self.BASE_URL = "/api/consumption/"

        self.BY_AGE_URL = self.BASE_URL + "by_age/"
        self.BY_COUNTRY_URL = self.BASE_URL + "by_country/"
        self.BY_EDUCATION_URL = self.BASE_URL + "by_education/"
        self.BY_ETHNICITY_URL = self.BASE_URL + "by_ethnicity/"
        self.BY_GENDER_URL = self.BASE_URL + "by_gender/"

        # Populating the test database with the CSV data
        parser = Parser()
        parser.csv_to_database()

    def test_endpoint_is_working(self):
        response = self.client.get(self.BY_AGE_URL + "?age_range=18-24&drug=alcohol")
        self.assertEqual(response.status_code, 200)

    def test_url_not_found(self):
        response = self.client.get(self.BASE_URL + "bad_url")
        self.assertEqual(response.status_code, 404)

    # BY AGE
    def test_bad_age_range(self):
        response = self.client.get(
            self.BY_AGE_URL + "?age_range=bad_range&drug=Alcohol"
        )
        self.assertEqual(response.status_code, 400)

    def test_bad_drug(self):
        response = self.client.get(self.BY_AGE_URL + "?age_range=18-24&drug=bad_drug")
        self.assertEqual(response.status_code, 400)

    def test_consumption_by_age(self):
        response = self.client.get(self.BY_AGE_URL + "?age_range=18-24&drug=alcohol")
        self.assertEqual(response.status_code, 200)

        self.assertEqual(
            response.json(),
            {
                "age_range": "18-24",
                "gender": None,
                "ethnicity": None,
                "education": None,
                "country": None,
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
        response = self.client.get(self.BY_AGE_URL)
        self.assertEqual(response.status_code, 422)

    def test_consumption_by_age_with_custom_values(self):
        response = self.client.get(self.BY_AGE_URL + "?age_range=25-34&drug=alcohol")
        self.assertEqual(response.status_code, 200)

    # BY COUNTRY
    def test_consumption_by_country(self):
        response = self.client.get(self.BY_COUNTRY_URL + "?country=uk&drug=alcohol")
        self.assertEqual(response.status_code, 200)

        self.assertEqual(
            response.json(),
            {
                "age_range": None,
                "gender": None,
                "ethnicity": None,
                "education": None,
                "country": "uk",
                "drug": "alcohol",
                "data": {
                    "used in last week": 461,
                    "used in last day": 304,
                    "used in last month": 124,
                    "used in last year": 80,
                    "used in last decade": 33,
                    "used over a decade ago": 22,
                    "never used": 20,
                },
            },
        )

    def test_consumption_by_country_with_default_values(self):
        response = self.client.get(self.BY_COUNTRY_URL)
        self.assertEqual(response.status_code, 422)

    def test_consumption_by_country_with_bad_country(self):
        response = self.client.get(
            self.BY_COUNTRY_URL + "?country=bad_country&drug=alcohol"
        )
        self.assertEqual(response.status_code, 400)

    def test_consumption_by_country_with_bad_drug(self):
        response = self.client.get(self.BY_COUNTRY_URL + "?country=uk&drug=bad_drug")
        self.assertEqual(response.status_code, 400)

    # BY EDUCATION
    def test_consumption_by_education(self):
        response = self.client.get(
            self.BY_EDUCATION_URL + "?education=university_degree&drug=alcohol"
        )
        self.assertEqual(response.status_code, 200)

        self.assertEqual(
            response.json(),
            {
                "age_range": None,
                "gender": None,
                "ethnicity": None,
                "education": "university degree",
                "country": None,
                "drug": "alcohol",
                "data": {
                    "used in last week": 217,
                    "used in last day": 138,
                    "used in last month": 56,
                    "used in last year": 35,
                    "used in last decade": 16,
                    "used over a decade ago": 9,
                    "never used": 9,
                },
            },
        )

    def test_consumption_by_education_with_default_values(self):
        response = self.client.get(self.BY_EDUCATION_URL)
        self.assertEqual(response.status_code, 422)

    def test_consumption_by_education_with_bad_education(self):
        response = self.client.get(
            self.BY_EDUCATION_URL + "?education=bad_education&drug=alcohol"
        )
        self.assertEqual(response.status_code, 400)

    def test_consumption_by_education_with_bad_drug(self):
        response = self.client.get(
            self.BY_EDUCATION_URL + "?education=university_degree&drug=bad_drug"
        )
        self.assertEqual(response.status_code, 400)

    # BY ETHNICITY

    def test_consumption_by_ethnicity(self):
        response = self.client.get(
            self.BY_ETHNICITY_URL + "?ethnicity=white&drug=alcohol"
        )
        self.assertEqual(response.status_code, 200)

        self.assertEqual(
            response.json(),
            {
                "age_range": None,
                "gender": None,
                "ethnicity": "white",
                "education": None,
                "country": None,
                "drug": "alcohol",
                "data": {
                    "used in last week": 698,
                    "used in last day": 475,
                    "used in last month": 253,
                    "used in last year": 178,
                    "used in last decade": 63,
                    "used over a decade ago": 32,
                    "never used": 21,
                },
            },
        )

    def test_consumption_by_ethnicity_with_default_values(self):
        response = self.client.get(self.BY_ETHNICITY_URL)

        self.assertEqual(response.status_code, 422)

    def test_consumption_by_ethnicity_with_bad_ethnicity(self):
        response = self.client.get(
            self.BY_ETHNICITY_URL + "?ethnicity=bad_ethnicity&drug=alcohol"
        )
        self.assertEqual(response.status_code, 400)

    def test_consumption_by_ethnicity_with_bad_drug(self):
        response = self.client.get(
            self.BY_ETHNICITY_URL + "?ethnicity=white&drug=bad_drug"
        )
        self.assertEqual(response.status_code, 400)

    # BY GENDER

    def test_consumption_by_gender(self):
        response = self.client.get(self.BY_GENDER_URL + "?gender=male&drug=alcohol")

        self.assertEqual(response.status_code, 200)

        self.assertEqual(
            response.json(),
            {
                "age_range": None,
                "gender": "male",
                "ethnicity": None,
                "education": None,
                "country": None,
                "drug": "alcohol",
                "data": {
                    "used in last week": 356,
                    "used in last day": 275,
                    "used in last month": 135,
                    "used in last year": 105,
                    "used in last decade": 36,
                    "never used": 19,
                    "used over a decade ago": 17,
                },
            },
        )

    def test_consumption_by_gender_with_default_values(self):
        response = self.client.get(self.BY_GENDER_URL)
        self.assertEqual(response.status_code, 422)

    def test_consumption_by_gender_with_bad_gender(self):
        response = self.client.get(
            self.BY_GENDER_URL + "?gender=bad_gender&drug=alcohol"
        )
        self.assertEqual(response.status_code, 400)

    def test_consumption_by_gender_with_bad_drug(self):
        response = self.client.get(self.BY_GENDER_URL + "?gender=male&drug=bad_drug")
        self.assertEqual(response.status_code, 400)
