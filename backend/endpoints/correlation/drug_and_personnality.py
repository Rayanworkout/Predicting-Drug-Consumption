from ninja import Router
from .schemas import CorrelationResponse

from ..models import CorrelationMatrix

drug_and_personnality_router = Router(
    tags=["Correlation between drug and personnality"]
)


@drug_and_personnality_router.get(
    "/",
    tags=["Correlation between drug and personnality"],
    response=CorrelationResponse,
)
def drug_and_personnality_correlation(
    request,

):
    """
    This endpoint returns the correlation between personality traits and drug usage.

    It answers questions like:
      - Does a person with a high neuroticism score consume more cannabis?
      - Does a person with a high extraversion score consume more cocaine?

      The return format is a dictionary with the following structure:

      For each personality trait, there is a dictionary with the drug name as the key and the correlation value as the value.

      For example here, we have the correlation between neuroticism personnality and each drug, the biggest being with meth.
      A high value means a high correlation between the personality trait and the drug consumption.

    {
        "neuroticism": {
        "alcohol": -0.00188158417223937,
        "amphet": 0.13112046247262,
        "amyl": 0.0333170574669899,
        "benzos": 0.272220656002945,
        "caff": 0.0130318890175701,
        "cannabis": 0.0955351561625027,
        "choc": 0.0125831035855382,
        "coke": 0.139915051733013,
        "crack": 0.1114349676397,
        "ecstasy": 0.0699477751255228,
        "heroin": 0.17268453031887,
        "ketamine": 0.0627501403455457,
        "legalh": 0.113341935801327,
        "lsd": 0.0370946069612098,
        "meth": 0.184671988472417, <- Biggest correlation
        "mushrooms": 0.0423859584338945,
        "nicotine": 0.128429949375856,
        "semer": -0.00167269480215018,
        "vsa": 0.115085811814252
        },
    }
        ...

        Check notebooks/correlation/drug_usage_and_personality.ipynb for the example chart that must be made with this data.
    """

    raw_data = CorrelationMatrix.objects.all().values()

    cleaned_data = {}

    for entry in raw_data:
        trait = entry["personality_trait"]
        correlation = entry["correlation"]
        drug = entry["drug"]

        if trait not in cleaned_data:
            cleaned_data[trait] = {}

        cleaned_data[trait][drug] = correlation

    return cleaned_data
