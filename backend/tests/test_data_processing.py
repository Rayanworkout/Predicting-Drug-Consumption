from django.test import TestCase
from api.models import Respondent
from data_processing import get_drug_consumption_by_age


class TestParser(TestCase):

    def setUp(self) -> None:
        pass
    
    def test_get_drug_consumption_by_age(self):
        age_range = "18-24"
        drug = "alcohol"
        data = get_drug_consumption_by_age(age_range, drug)
        
        print(data)
    