from ninja import Router
from .schemas import CorrelationResponse

from ..models import CorrelationToDrug

drug_and_personality_router = Router(tags=["Correlation between drug and personality"])


@drug_and_personality_router.get(
    "/",
    tags=["Correlation between drug and personality"],
    response=CorrelationResponse,
)
def drug_and_personality_correlation(
    request,
):
    """
    This endpoint returns the correlation between personality traits and drug usage, SORTED by correlation value.

    It answers questions like:
      - Does a person with a high neuroticism score consume more cannabis?
      - Does a person with a high extraversion score consume more cocaine?

      The return format is a dictionary with the following structure:

      For each personality trait, there is a dictionary with the drug name as the key and its correlation value.

      For example here, we have the correlation between neuroticism personality and each drug, the biggest being with meth.
      A high value means a high correlation between the personality trait and the drug consumption.

    Sample:

        {
        "benzos": 0.272220656002945, <--------- Highest correlation, it means that people with high neuroticism score consume more benzos.
        "meth": 0.184671988472417,
        "heroin": 0.17268453031887,
        "coke": 0.139915051733013,
        "amphet": 0.13112046247262,
        "nicotine": 0.128429949375856,
        "vsa": 0.115085811814252,
        "legalh": 0.113341935801327,
        "crack": 0.1114349676397,
        "cannabis": 0.0955351561625027,
        "ecstasy": 0.0699477751255228,
        "ketamine": 0.0627501403455457,
        "mushrooms": 0.0423859584338945,
        "lsd": 0.0370946069612098,
        "amyl": 0.0333170574669899,
        "caff": 0.0130318890175701,
        "choc": 0.0125831035855382,
        "semer": -0.00167269480215018,
        "alcohol": -0.00188158417223937,
    }
        ...

        Check notebooks/correlation/drug_usage_and_personality.ipynb for the example chart that must be made with this data.
    """

    raw_data = CorrelationToDrug.objects.all().values()

    cleaned_data = {}

    # We construct the data fetched from the database into a more readable API response
    for entry in raw_data:
        trait = entry["feature"]
        correlation = entry["correlation"]
        drug = entry["drug"]

        if trait not in cleaned_data:
            cleaned_data[trait] = {}

        cleaned_data[trait][drug] = correlation

    # We sort each dict of each trait by the correlation value
    for trait in cleaned_data:
        cleaned_data[trait] = dict(
            sorted(cleaned_data[trait].items(), key=lambda item: item[1], reverse=True)
        )

    return cleaned_data
