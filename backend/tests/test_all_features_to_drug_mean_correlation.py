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
                    "mean_correlation": 0.24750768760730996,
                },
                {
                    "id": 2,
                    "feature": "impulsive",
                    "mean_correlation": 0.1835408142616583,
                },
                {
                    "id": 3,
                    "feature": "openness_to_experience",
                    "mean_correlation": 0.18211357240362108,
                },
                {
                    "id": 4,
                    "feature": "neuroticism",
                    "mean_correlation": 0.09115772430291505,
                },
                {
                    "id": 5,
                    "feature": "ethnicity",
                    "mean_correlation": 0.07279538563388822,
                },
                {
                    "id": 6,
                    "feature": "extraversion",
                    "mean_correlation": -0.005960554225981149,
                },
                {
                    "id": 7,
                    "feature": "agreeableness",
                    "mean_correlation": -0.10339419036206977,
                },
                {
                    "id": 8,
                    "feature": "education",
                    "mean_correlation": -0.11093035147121946,
                },
                {
                    "id": 9,
                    "feature": "conscientiousness",
                    "mean_correlation": -0.1526333011851522,
                },
                {
                    "id": 10,
                    "feature": "gender",
                    "mean_correlation": -0.15812904754418552,
                },
                {"id": 11, "feature": "age", "mean_correlation": -0.1923893011427491},
                {
                    "id": 12,
                    "feature": "country",
                    "mean_correlation": -0.25053952952862485,
                },
            ],
        )
