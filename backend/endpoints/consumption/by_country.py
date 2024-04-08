from ninja import Query, Router

from data_processing import get_drug_consumption_by_category

from .schemas import (
    ConsumptionResponse,
    ConsumptionRequest,
    ConsumptionErrorResponse,
)
from endpoints.respondent_field_choices import COUNTRY_CHOICES, DRUGS_LIST

by_country_router = Router(tags=["Consumption by country"])


@by_country_router.get(
    "/",
    response={200: ConsumptionResponse, 400: ConsumptionErrorResponse},
    tags=["Consumption by country"],
)
def consumption_by_country(
    request,
    params: Query[ConsumptionRequest],
):
    """
    Endpoint to GET the consumption statistics of a given drug in a given country.

    
    Example usage:
            
            /api/consumption/by_country?country=uk&drug=alcohol
            /api/consumptionb/by_country?country=canada&drug=meth
        
    Parameters:    
        
        - country: str, country to filter the dataset by. Allowed values: "australia", "canada", "new_zealand", "other", "republic_of_ireland", "uk", "usa"


        - drug: str, drug to display consumption for.

        Allowed values: "alcohol", "amphet", "amyl", "benzos", "caff", "cannabis",
                        "choc", "coke", "crack", "ecstasy", "heroin", "ketamine",
                        "legalh", "lsd", "meth", "mushrooms", "nicotine", "semer", "vsa"

    """

    country = params.country.replace("_", " ").lower()
    country_choices = [choice[0].replace("_", " ").lower() for choice in COUNTRY_CHOICES]

    if country not in country_choices:
        return 400, {
            "message": "invalid country value",
            "allowed_values": country_choices,
        }

    drug = params.drug.lower()

    if drug not in DRUGS_LIST:
        return 400, {"message": "invalid drug name", "allowed_values": DRUGS_LIST}

    return get_drug_consumption_by_category(
        category="country", value=params.country, drug=params.drug
    )
