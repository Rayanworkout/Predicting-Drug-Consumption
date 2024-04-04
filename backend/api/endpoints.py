from ninja import NinjaAPI, Query

from data_processing import get_drug_consumption_by_age, get_population_repartition

from .schemas import (
    #############################
    # Consumption By Age
    ConsumptionByAgeResponse,
    ConsumptionByAgeRequest,
    ConsumptionByAgeErrorResponse,
    #############################
    # Population Repartition
    PopulationRepartitionResponse,
    PopulationRepartitionRequest,
    PopulationRepartitionErrorResponse,
)
from api.respondent_field_choices import AGE_CHOICES, DRUGS_LIST


# Creating an instance of NinjaAPI
api = NinjaAPI()


@api.get(
    "/consumption_by_age",
    response={200: ConsumptionByAgeResponse, 400: ConsumptionByAgeErrorResponse},
    tags=["Consumption By Age"],
)
def consumption_by_age(
    request,
    params: Query[ConsumptionByAgeRequest],
):
    """
    Endpoint to GET the consumptions statistics of a given drug in a given age range.

    Default values are set to "18-24" for age_range and "meth" for drug.

    Example usage:
        /api/consumption_by_age?age_range=18-24&drug=meth
        /api/consumption_by_age?age_range=25-34&drug=alcohol

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
        return 400, {"message": f"age_range must be one of {age_choices}"}

    drug = params.drug.lower()

    if drug not in DRUGS_LIST:
        return 400, {"message": f"drug must be one of {DRUGS_LIST}"}

    return get_drug_consumption_by_age(age_range=params.age_range, drug=params.drug)


@api.get(
    "/population_repartition",
    response={
        200: PopulationRepartitionResponse,
        400: PopulationRepartitionErrorResponse,
    },
    tags=["Population Repartition"],
)
def population_repartition(
    request,
    params: Query[PopulationRepartitionRequest],
):
    """
    Endpoint to GET the repartition of a given population in the database.

    Default value is set to "age" for population.

    Example usage:
        /api/population_repartition?population=age
        /api/population_repartition?population=country

    Parameters:
        - population: str, population to display repartition for.

            Allowed values: "age", "country", "education", "ethnicity", "gender"
    """

    population_choices = ["age", "country", "education", "ethnicity", "gender"]

    if params.population not in population_choices:
        return 400, {"message": f"population must be one of {population_choices}"}

    return 200, get_population_repartition(population=params.population)
