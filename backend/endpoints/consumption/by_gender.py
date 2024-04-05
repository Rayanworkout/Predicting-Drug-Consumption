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

    """

    if params.drug not in DRUGS_LIST:
        return 400, {"message": "invalid drug name", "allowed values": DRUGS_LIST}

    if params.gender not in ["male", "female"]:
        return 400, {"message": "invalid gender", "allowed values": ["male", "female"]}

    return 200, get_drug_consumption_by_gender(
        params.gender,
        params.drug,
    )
