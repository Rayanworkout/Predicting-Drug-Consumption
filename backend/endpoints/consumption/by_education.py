from ninja import Query, Router

from data_processing import get_drug_consumption_by_category

from .schemas import (
    ConsumptionResponse,
    ConsumptionRequest,
    ConsumptionErrorResponse,
)
from endpoints.respondent_field_choices import DRUGS_LIST

by_education_router = Router(tags=["Consumption by education"])


@by_education_router.get(
    "/",
    response={200: ConsumptionResponse, 400: ConsumptionErrorResponse},
    tags=["Consumption by education"],
)
def consumption_by_education(
    request,
    params: Query[ConsumptionRequest],
):
    """
    Endpoint to GET the consumption statistics of a given drug in a given education range.

    
    Example usage:
            
            /api/consumption/by_education?education=no_certificate&drug=alcohol
            /api/consumptionb/by_education?education=18&drug=meth
        
    Parameters:    
        
        - education: str, education type to filter the dataset by. Allowed values: "before_16", "16", "17", "18", "no_certificate", "certificate", "university_degree", "masters_degree", "doctorate_degree"

        Values explanation:
                - before_16: Left School Before 16 years
                - 16: Left School at 16 years
                - 17: Left School at 17 years
                - 18: Left School at 18 years
                - no_certificate: Some College, No Certificate Or Degree
                - certificate: Professional Certificate / Diploma
                - university_degree: University Degree
                - masters_degree: Masters Degree
                - doctorate_degree: Doctorate Degree


        - drug: str, drug to display consumption for.

        Allowed values: "alcohol", "amphet", "amyl", "benzos", "caff", "cannabis",
                        "choc", "coke", "crack", "ecstasy", "heroin", "ketamine",
                        "legalh", "lsd", "meth", "mushrooms", "nicotine", "semer", "vsa"

    """

    connection = {
        "before_16": "Left School Before 16 years",
        "16": "Left School at 16 years",
        "17": "Left School at 17 years",
        "18": "Left School at 18 years",
        "no_certificate": "Some College,No Certificate Or Degree",
        "certificate": "Professional Certificate/ Diploma",
        "university_degree": "University Degree",
        "masters_degree": "Masters Degree",
        "doctorate_degree": "Doctorate Degree",
    }

    connection = {k.lower(): v.lower() for k, v in connection.items()}

    if params.education not in connection:
        return 400, {
            "message": "invalid education value",
            "allowed_values": connection.keys(),
        }

    drug = params.drug.lower()

    if drug not in DRUGS_LIST:
        return 400, {"message": "invalid drug name", "allowed_values": DRUGS_LIST}

    return get_drug_consumption_by_category(
        category="education", value=connection[params.education], drug=params.drug
    )
