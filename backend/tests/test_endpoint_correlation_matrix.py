from django.test import TestCase, Client
from csv_parser.csv_parser import Parser
from data_processing.personality_drug_correlation_matrix import save_correlation_matrix


class TestPopulationRepartitionEndpoint(TestCase):

    def setUp(self) -> None:
        self.client = Client()

        self.BASE_URL = "/api/correlation/drug_and_personality/"

        # Populating the test database with the CSV data and creating the correlation matrix
        parser = Parser()
        parser.csv_to_database()
        save_correlation_matrix()

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
                "neuroticism": {
                    "alcohol": -0.0018815841722393694,
                    "amphet": 0.13112046247262013,
                    "amyl": 0.03331705746698994,
                    "benzos": 0.27222065600294504,
                    "caff": 0.01303188901757012,
                    "cannabis": 0.09553515616250274,
                    "choc": 0.012583103585538194,
                    "coke": 0.13991505173301327,
                    "crack": 0.11143496763969954,
                    "ecstasy": 0.06994777512552283,
                    "heroin": 0.17268453031886985,
                    "ketamine": 0.06275014034554566,
                    "legalh": 0.11334193580132718,
                    "lsd": 0.037094606961209795,
                    "meth": 0.18467198847241742,
                    "mushrooms": 0.042385958433894505,
                    "nicotine": 0.12842994937585628,
                    "semer": -0.0016726948021501824,
                    "vsa": 0.11508581181425218,
                },
                "extraversion": {
                    "alcohol": 0.09230274939857623,
                    "amphet": -0.04109511645630196,
                    "amyl": 0.030198786072465296,
                    "benzos": -0.10344222263687465,
                    "caff": 0.05434271048430591,
                    "cannabis": -0.014369423177773198,
                    "choc": 0.020305099496419905,
                    "coke": 0.03094174310953482,
                    "crack": -0.05096863029043002,
                    "ecstasy": 0.07882175420101248,
                    "heroin": -0.07999827544641211,
                    "ketamine": 0.018726739347562173,
                    "legalh": -0.037383378700842476,
                    "lsd": 0.01816569918459418,
                    "meth": -0.12170750628038614,
                    "mushrooms": 0.021105337896321647,
                    "nicotine": -0.0191957388261812,
                    "semer": 0.0229089590617372,
                    "vsa": -0.03290981673097049,
                },
                "openness_to_experience": {
                    "alcohol": 0.03271128967304343,
                    "amphet": 0.22111569622453528,
                    "amyl": 0.060511069927769966,
                    "benzos": 0.20133416560740472,
                    "caff": 0.02730434660637353,
                    "cannabis": 0.41416262189358427,
                    "choc": 0.0012394022707940373,
                    "coke": 0.18827647357875874,
                    "crack": 0.09700175474358784,
                    "ecstasy": 0.29630570883896784,
                    "heroin": 0.13419352172519974,
                    "ketamine": 0.18506098579470598,
                    "legalh": 0.31732226610206693,
                    "lsd": 0.369759110519103,
                    "meth": 0.17198405933465227,
                    "mushrooms": 0.3691394148112892,
                    "nicotine": 0.19545953183460202,
                    "semer": 0.026774049594144297,
                    "vsa": 0.15050240658821412,
                },
                "agreeableness": {
                    "alcohol": -0.021805895423600268,
                    "amphet": -0.1488677620869975,
                    "amyl": -0.09605744588848018,
                    "benzos": -0.16451227471851362,
                    "caff": -0.016189970815965054,
                    "cannabis": -0.1484810696562124,
                    "choc": 0.03626631512774659,
                    "coke": -0.19814723998208347,
                    "crack": -0.10394529020776071,
                    "ecstasy": -0.11454950502002643,
                    "heroin": -0.1698861315621001,
                    "ketamine": -0.11076325216434633,
                    "legalh": -0.13998283276703447,
                    "lsd": -0.09388775242497155,
                    "meth": -0.1568473638295233,
                    "mushrooms": -0.11142373278432022,
                    "nicotine": -0.11107489850157858,
                    "semer": 0.019749779506563175,
                    "vsa": -0.1140832936801218,
                },
                "conscientiousness": {
                    "alcohol": -0.0002032983631222252,
                    "amphet": -0.23623491722370002,
                    "amyl": -0.11780280338730081,
                    "benzos": -0.20638274743235127,
                    "caff": -0.027744329400542687,
                    "cannabis": -0.2747799444650534,
                    "choc": 0.0003569046826525324,
                    "coke": -0.19522806324885986,
                    "crack": -0.13328699491804788,
                    "ecstasy": -0.21733474914744577,
                    "heroin": -0.15839756292185955,
                    "ketamine": -0.15348154984631576,
                    "legalh": -0.2544169558020773,
                    "lsd": -0.16069891570779837,
                    "meth": -0.19138005237979674,
                    "mushrooms": -0.19123685797257584,
                    "nicotine": -0.23086179854203254,
                    "semer": 0.008524206670734918,
                    "vsa": -0.15944229311239677,
                },
                "impulsive": {
                    "alcohol": 0.045971577734806784,
                    "amphet": 0.2894381837447689,
                    "amyl": 0.126263774615804,
                    "benzos": 0.22337439274854035,
                    "caff": 0.04938775109524931,
                    "cannabis": 0.3105287456498308,
                    "choc": -0.020178342647604024,
                    "coke": 0.26004214064913733,
                    "crack": 0.18573066729690763,
                    "ecstasy": 0.2608640467105363,
                    "heroin": 0.19770118105751175,
                    "ketamine": 0.17766460921631624,
                    "legalh": 0.26757876983751555,
                    "lsd": 0.22920511335009347,
                    "meth": 0.1815241602049484,
                    "mushrooms": 0.26368389461899866,
                    "nicotine": 0.2462987623970625,
                    "semer": 0.01117750201195769,
                    "vsa": 0.18101854067912868,
                },
                "sensation_seeking": {
                    "alcohol": 0.10847229214714468,
                    "amphet": 0.33110522351156185,
                    "amyl": 0.19528020529138662,
                    "benzos": 0.24790332216013655,
                    "caff": 0.05204936269975353,
                    "cannabis": 0.45613655450406515,
                    "choc": -0.039835957511902706,
                    "coke": 0.3433520664032061,
                    "crack": 0.1902012003845489,
                    "ecstasy": 0.3881861965599236,
                    "heroin": 0.2136844076019245,
                    "ketamine": 0.24360859994079,
                    "legalh": 0.40557785525318313,
                    "lsd": 0.3655357774337742,
                    "meth": 0.21888392062638684,
                    "mushrooms": 0.3782853777625291,
                    "nicotine": 0.30563459119612085,
                    "semer": 0.04798564099823064,
                    "vsa": 0.25059942757613063,
                },
            },
        )
