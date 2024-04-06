from ninja import Query, Router

from data_processing import get_drug_consumption_by_category

from .schemas import (
    ConsumptionByAgeResponse,
    ConsumptionByAgeRequest,
    ConsumptionErrorResponse,
)
from endpoints.respondent_field_choices import AGE_CHOICES, DRUGS_LIST

by_age_router = Router(tags=["Consumption By Age"])


@by_age_router.get(
    "/",
    response={200: ConsumptionByAgeResponse, 400: ConsumptionErrorResponse},
    tags=["Consumption By Age"],
)
def consumption_by_age(
    request,
    params: Query[ConsumptionByAgeRequest],
):
    """
    Endpoint to GET the consumptions statistics of a given drug in a given age range.

    Example usage:
        /api/consumption/by_age?age_range=18-24&drug=meth
        /api/consumptionb/by_age?age_range=25-34&drug=alcohol

    Parameters:
        - age_range: str, age range to filter the dataset by. Allowed values: "18-24", "25-34", "35-44", "45-54", "55-64", "65+"

        - drug: str, drug to display consumption for.

            Allowed values: "Alcohol", "Amphet", "Amyl", "Benzos", "Caff", "Cannabis",
                            "Choc", "Coke", "Crack", "Ecstasy", "Heroin", "Ketamine",
                            "Legalh", "LSD", "Meth", "Mushrooms", "Nicotine", "Semer", "VSA"


    Returns:
        - A dict ordered by the drug consumption count with the following content:
        {
            "age_range": "18-24",
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

    age_choices = [choice[0] for choice in AGE_CHOICES]

    if params.age_range not in age_choices:
        return 400, {"message": "invalid age_range", "allowed_values": age_choices}

    drug = params.drug.lower()

    if drug not in DRUGS_LIST:
        return 400, {"message": "invalid drug name", "allowed_values": DRUGS_LIST}

    return get_drug_consumption_by_category(
        category="age", value=params.age_range, drug=params.drug
    )
