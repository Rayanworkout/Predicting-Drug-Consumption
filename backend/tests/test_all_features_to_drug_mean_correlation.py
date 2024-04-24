from django.test import TestCase
from csv_parser.csv_parser import Parser

from endpoints.models import MeanCorrelationToFeature
from data_processing.all_features_to_drugs_mean_correlation import (
    save_all_features_to_drugs_mean,
)


class TestFeatureToMeanProcessing(TestCase):

    def setUp(self) -> None:
        self.parser = Parser()
        self.parser.csv_to_database()

    def test_data_is_inserted_to_db(self):
        save_all_features_to_drugs_mean()
        self.assertEqual(MeanCorrelationToFeature.objects.count(), 12)

    def test_data_is_correct(self):
        save_all_features_to_drugs_mean()
        data = MeanCorrelationToFeature.objects.all().values()
        self.assertEqual(
            list(data),
            [
                {
                    "id": 1,
                    "feature": "sensation_seeking",
                    "mean_correlation": 0.24750768760731007,
                },
                {
                    "id": 2,
                    "feature": "impulsive",
                    "mean_correlation": 0.18354081426165825,
                },
                {
                    "id": 3,
                    "feature": "openness_to_experience",
                    "mean_correlation": 0.18211357240362122,
                },
                {
                    "id": 4,
                    "feature": "neuroticism",
                    "mean_correlation": 0.09115772430291509,
                },
                {
                    "id": 5,
                    "feature": "ethnicity",
                    "mean_correlation": 0.0727953856338884,
                },
                {
                    "id": 6,
                    "feature": "extraversion",
                    "mean_correlation": -0.005960554225981166,
                },
                {
                    "id": 7,
                    "feature": "agreeableness",
                    "mean_correlation": -0.10339419036206986,
                },
                {
                    "id": 8,
                    "feature": "education",
                    "mean_correlation": -0.1109303514712195,
                },
                {
                    "id": 9,
                    "feature": "conscientiousness",
                    "mean_correlation": -0.15263330118515217,
                },
                {
                    "id": 10,
                    "feature": "gender",
                    "mean_correlation": -0.15812904754418589,
                },
                {"id": 11, "feature": "age", "mean_correlation": -0.19238930114274916},
                {
                    "id": 12,
                    "feature": "country",
                    "mean_correlation": -0.250539529528625,
                },
            ],
        )
