from django.test import TestCase, Client
from csv_parser.csv_parser import Parser
from data_processing.all_features_to_drugs_mean_correlation import (
    save_all_features_to_drugs_mean,
)


class TestMeanCorrelationDrugAndfeatureEndpoint(TestCase):

    def setUp(self) -> None:
        self.client = Client()

        self.BASE_URL = "/api/correlation/feature_to_drug_mean/"

        # Populating the test database with the CSV data and creating the correlation matrix
        parser = Parser()
        parser.csv_to_database()
        save_all_features_to_drugs_mean()

    def test_endpoint_is_working(self):
        response = self.client.get(self.BASE_URL)
        self.assertEqual(response.status_code, 200)

    def test_url_not_found(self):
        response = self.client.get(self.BASE_URL + "bad_url")
        self.assertEqual(response.status_code, 404)

    def test_response_content(self):
        response = self.client.get(self.BASE_URL)
        self.assertEqual(
            response.json(),
            {
                "sensation_seeking": 0.24750768760730996,
                "impulsive": 0.1835408142616583,
                "openness_to_experience": 0.18211357240362108,
                "neuroticism": 0.09115772430291505,
                "ethnicity": 0.07279538563388822,
                "extraversion": -0.005960554225981149,
                "agreeableness": -0.10339419036206977,
                "education": -0.11093035147121946,
                "conscientiousness": -0.1526333011851522,
                "gender": -0.15812904754418552,
                "age": -0.1923893011427491,
                "country": -0.25053952952862485,
            },
        )
