from ninja import Router, Query
from data_processing import get_drug_consumption_by_gender
from .schemas import (
    ConsumptionByGenderResponse,
    ConsumptionErrorResponse,
    ConsumptionByGenderRequest,
)

from endpoints.respondent_field_choices import DRUGS_LIST


by_gender_router = Router()


@by_gender_router.get(
    "/",
    response={200: ConsumptionByGenderResponse, 400: ConsumptionErrorResponse},
    tags=["Consumption By Gender"],
)
def consumption_by_gender(
    request,
    params: Query[ConsumptionByGenderRequest],
):
    """
    Endpoint to GET the consumptions statistics of a given drug for a given gender.

    Default values are set to "male" for gender and "meth" for drug.

    Example usage:
        /api/consumption/by_gender?agender=male&drug=meth
        /api/consumption/by_gender?gender=female&drug=alcohol

    Parameters:
        - gender: str, gender to filter the dataset by. Allowed values: "male", "female"

        - drug: str, drug to display consumption for.

            Allowed values: "Alcohol", "Amphet", "Amyl", "Benzos", "Caff", "Cannabis",
                            "Choc", "Coke", "Crack", "Ecstasy", "Heroin", "Ketamine",
                            "Legalh", "LSD", "Meth", "Mushrooms", "Nicotine", "Semer", "VSA"


    Returns:
        - A dict ordered by the drug consumption count with the following content:
        {
            "gender": "male",
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

    if params.drug not in DRUGS_LIST:
        return 400, {"message": "invalid drug name", "allowed_values": DRUGS_LIST}

    if params.gender not in ["male", "female"]:
        return 400, {"message": "invalid gender", "allowed_values": ["male", "female"]}

    return 200, get_drug_consumption_by_gender(
        params.gender,
        params.drug,
    )
