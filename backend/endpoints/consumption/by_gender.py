from ninja import Router, Query
from data_processing import get_drug_consumption_by_category
from .schemas import (
    ConsumptionResponse,
    ConsumptionErrorResponse,
    ConsumptionRequest,
)

from endpoints.respondent_field_choices import DRUGS_LIST


by_gender_router = Router()


@by_gender_router.get(
    "/",
    response={200: ConsumptionResponse, 400: ConsumptionErrorResponse},
    tags=["Consumption by gender"],
)
def consumption_by_gender(
    request,
    params: Query[ConsumptionRequest],
):
    """
    Endpoint to GET the consumptions statistics of a given drug for a given gender.

    Example usage:
        
        /api/consumption/by_gender?gender=male&drug=meth
        /api/consumption/by_gender?gender=female&drug=alcohol

    Parameters:
        
        - gender: str, gender to filter the dataset by. Allowed values: "male", "female"

        - drug: str, drug to display consumption for.

        Allowed values: "alcohol", "amphet", "amyl", "benzos", "caff", "cannabis",
                        "choc", "coke", "crack", "ecstasy", "heroin", "ketamine",
                        "legalh", "lsd", "meth", "mushrooms", "nicotine", "semer", "vsa"

    """

    if params.drug not in DRUGS_LIST:
        return 400, {"message": "invalid drug name", "allowed_values": DRUGS_LIST}

    if params.gender not in ["male", "female"]:
        return 400, {"message": "invalid gender", "allowed_values": ["male", "female"]}

    return 200, get_drug_consumption_by_category(
        category="gender",
        value=params.gender,
        drug=params.drug,
    )
