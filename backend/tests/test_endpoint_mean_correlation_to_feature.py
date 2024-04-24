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
                "sensation_seeking": 0.24750768760731007,
                "impulsive": 0.18354081426165825,
                "openness_to_experience": 0.18211357240362122,
                "neuroticism": 0.09115772430291509,
                "ethnicity": 0.0727953856338884,
                "extraversion": -0.005960554225981166,
                "agreeableness": -0.10339419036206986,
                "education": -0.1109303514712195,
                "conscientiousness": -0.15263330118515217,
                "gender": -0.15812904754418589,
                "age": -0.19238930114274916,
                "country": -0.250539529528625,
            },
        )
