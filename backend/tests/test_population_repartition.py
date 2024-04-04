from django.test import TestCase
from csv_parser.csv_parser import Parser

from data_processing import get_population_repartition


class TestPopulationRepartition(TestCase):

    def setUp(self) -> None:
        # Populating the test database with the CSV data
        parser = Parser()
        parser.csv_to_database()

    def test_population_repartition_without_args(self):
        # Testing the get_population_repartition function without arguments
        with self.assertRaises(TypeError):
            get_population_repartition()

    def test_population_repartition_with_invalid_arg(self):
        # Testing the get_population_repartition function with an invalid argument
        with self.assertRaises(ValueError):
            get_population_repartition("invalid_arg")

    def test_get_population_repartition_age(self):
        # Testing the get_population_repartition function
        repartition = get_population_repartition("age")
        self.assertIsInstance(repartition, dict)

        self.assertEqual(
            repartition,
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
        # Testing the get_population_repartition function
        repartition = get_population_repartition("country")
        self.assertIsInstance(repartition, dict)

        self.assertEqual(
            repartition,
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
        # Testing the get_population_repartition function
        repartition = get_population_repartition("education")
        self.assertIsInstance(repartition, dict)

        self.assertEqual(
            repartition,
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

    def test_population_repartition_by_ethnicity(self):
        # Testing the get_population_repartition function
        repartition = get_population_repartition("ethnicity")

        self.assertIsInstance(repartition, dict)

        self.assertEqual(
            repartition,
            {
                "data": [
                    {"ethnicity": "white", "count": 1720},
                    {"ethnicity": "other", "count": 63},
                    {"ethnicity": "black", "count": 33},
                    {"ethnicity": "asian", "count": 26},
                    {"ethnicity": "mixed-white/black", "count": 20},
                    {"ethnicity": "mixed-white/asian", "count": 20},
                    {"ethnicity": "mixed-black/asian", "count": 3},
                ]
            },
        )

    def test_population_repartition_by_gender(self):
        # Testing the get_population_repartition function
        repartition = get_population_repartition("gender")

        self.assertIsInstance(repartition, dict)

        self.assertEqual(
            repartition,
            {
                "data": [
                    {"gender": "male", "count": 943},
                    {"gender": "female", "count": 942},
                ]
            },
        )
