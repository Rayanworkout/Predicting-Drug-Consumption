from ninja import Router, Query
from data_processing import get_drug_consumption_by_category
from .schemas import (
    ConsumptionResponse,
    ConsumptionErrorResponse,
    ConsumptionRequest,
)

from endpoints.respondent_field_choices import ETHNICITY_CHOICES


by_ethnicity_router = Router()


@by_ethnicity_router.get(
    "/",
    response={200: ConsumptionResponse, 400: ConsumptionErrorResponse},
    tags=["Consumption by ethnicity"],
)
def consumption_by_ethnicity(
    request,
    params: Query[ConsumptionRequest],
):
    """
    Endpoint to GET the consumption statistics of a given drug for a given ethnicity.

    Example usage:
        /api/consumption/by_ethnicity?ethnicity=asian&drug=meth
        /api/consumption/by_ethnicity?ethnicity=other&drug=alcohol

    Parameters:
    (note the underscore instead of the "-" on mixed ethnicity)
        - ethnicity: str, ethnicity to filter the dataset by. Allowed values: "asian", "black", "mixed-black_asian", "mixed-white_asian", "mixed-white_black", "other", "white"

        - drug: str, drug to display consumption for.

            Allowed values: "alcohol", "amphet", "amyl", "benzos", "caff", "cannabis",
                            "choc", "coke", "crack", "ecstasy", "heroin", "ketamine",
                            "legalh", "lsd", "meth", "mushrooms", "nicotine", "semer", "vsa"


    Returns:
        - A dict ordered by the drug consumption count with the following content:
        {
            "ethnicity": "asian",
            "drug": "cannabis",
            "data": {
                "used in last day": 2346,
                "used in last week": 1013,
                "used in last year": 709,
                "used in last month": 699,
                "never used": 521,
                "used in last decade": 413,
                "used over a decade ago": 27
                }
        }


    """

    ethnicity_choices = [choice[0].replace('/', '_') for choice in ETHNICITY_CHOICES]

    if params.ethnicity not in ethnicity_choices:
        return 400, {
            "message": "invalid ethnicity",
            "allowed_values": ethnicity_choices,
        }

    return 200, get_drug_consumption_by_category(
        category="ethnicity",
        value=params.ethnicity.replace('_', '/'),
        drug=params.drug,
    )
