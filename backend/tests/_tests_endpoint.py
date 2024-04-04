from django.test import TestCase, Client
from api.models import Company


class TestEndpoint(TestCase):

    def setUp(self) -> None:
        self.client = Client()

        self.BASE_URL = "/api/companies"

        Company.objects.create(
            rank=1,
            organizationName="Apple",
            country="USA",
            revenue=274515000000,  # $274.515 billion
            profits=157410000000,  # $157.41 billion
            assets=338516000000,  # $338.516 billion
            marketValue=905600000000,  # $905.6 billion
        )

        Company.objects.create(
            rank=2,
            organizationName="Hyundai",
            country="South Korea",
            revenue=247015000000,  # $247.015 billion
            profits=49240000000,  # $49.24 billion
            assets=356556000000,  # $356.556 billion
            marketValue=1074800000000,  # $1.0748 trillion
        )

        Company.objects.create(
            rank=3,
            organizationName="Siemens",
            country="Germany",
            revenue=147015000000,  # $147.015 billion
            profits=39240000000,  # $39.24 billion
            assets=356556000000,  # $356.556 billion
            marketValue=1014800000000,  # $1.0148 trillion
        )

        Company.objects.create(
            rank=4,
            organizationName="Sinopec",
            country="China",
            revenue=143010000000,  # $143.01 billion
            profits=39240000000,  # $39.24 billion
            assets=286556000000,  # $286.556 billion
            marketValue=1024800000000,  # $1.0248 trillion
        )

        Company.objects.create(
            rank=5,
            organizationName="HSBC Holdings",
            country="United Kingdom",
            revenue=97015000000,  # $97.015 billion
            profits=49240000000,  # $49.24 billion
            assets=356556000000,  # $356.556 billion
            marketValue=1014800000000,  # $1.0148 trillion
        )

    def test_endpoint_is_working(self):
        response = self.client.get(self.BASE_URL)
        assert response.status_code == 200

    def test_url_not_found(self):
        response = self.client.get("/api/companiess")
        self.assertEqual(response.status_code, 404)

    def test_company_created(self):
        company = Company.objects.get(organizationName="Apple")
        self.assertIsNotNone(company)
        self.assertEqual(company.country, "USA")

    def test_filter_by_country(self):

        response = self.client.get(self.BASE_URL + "?country=usa")

        self.assertEqual(response.status_code, 200)

        self.assertEqual(len(response.json()), 1)

        self.assertEqual(response.json()[0]["organizationName"], "Apple")

    def test_filter_by_revenue(self):

        response = self.client.get(self.BASE_URL + "?revenue=100015000000")

        self.assertEqual(response.status_code, 200)

        self.assertEqual(len(response.json()), 4)

    def test_filter_by_country_and_revenue(self):
        response = self.client.get(self.BASE_URL + "?country=usa&revenue=100000")

        self.assertEqual(response.status_code, 200)

        self.assertEqual(len(response.json()), 1)

        self.assertEqual(response.json()[0]["organizationName"], "Apple")

    def test_order_by_revenue(self):
        response = self.client.get(self.BASE_URL + "?order_by=revenue")

        self.assertEqual(response.status_code, 200)

        self.assertEqual(len(response.json()), 5)

        self.assertEqual(response.json()[0]["organizationName"], "HSBC Holdings")

    def test_default_order_by_is_asc(self):
        response = self.client.get(self.BASE_URL)

        self.assertEqual(response.status_code, 200)

        self.assertEqual(len(response.json()), 5)

        companies = [x["organizationName"] for x in response.json()]

        self.assertEqual(
            companies, ["Apple", "Hyundai", "Siemens", "Sinopec", "HSBC Holdings"]
        )

    def test_order_by_desc(self):
        response = self.client.get(self.BASE_URL + "?order=desc")

        self.assertEqual(response.status_code, 200)

        self.assertEqual(len(response.json()), 5)

        self.assertEqual(response.json()[0]["organizationName"], "HSBC Holdings")

    def test_order_by_organizationName(self):
        response = self.client.get(self.BASE_URL + "?order_by=organizationName")

        self.assertEqual(response.status_code, 200)

        self.assertEqual(len(response.json()), 5)

        self.assertEqual(response.json()[1]["organizationName"], "HSBC Holdings")

    def test_order_by_profits(self):
        response = self.client.get(self.BASE_URL + "?order_by=profits")

        self.assertEqual(response.status_code, 200)

        self.assertEqual(len(response.json()), 5)

        self.assertEqual(response.json()[-1]["organizationName"], "Apple")
