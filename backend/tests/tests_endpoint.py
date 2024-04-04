from django.test import TestCase, Client


class TestEndpoints(TestCase):

    def setUp(self) -> None:
        self.client = Client()

        self.BASE_URL = "/api/"

    ####### CONSUMPTION BY AGE #######

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
        print(response.json())
        self.assertEqual(response.status_code, 400)
