from ninja import NinjaAPI, Query

from data_processing import get_drug_consumption_by_age

from .schemas import ConsumptionByAgeResponse, ConsumptionByAgeRequest

# Creating an instance of NinjaAPI
api = NinjaAPI()


@api.get(
    "/consumption_by_age",
    response=ConsumptionByAgeResponse,
    tags=["Consumption By Age"],
)
def consumption_by_age(
    request,
    params: Query[ConsumptionByAgeRequest],
):
    """
    Endpoint to GET the consumptions statistics of a given drug in a given age range.

    Parameters:

    - age_range: str, age range to filter the dataset by. Allowed values: "18-24", "25-34", "35-44", "45-54", "55-64", "65+"

    - drug: str, drug to display consumption for.

        Allowed values: "Alcohol", "Amphet", "Amyl", "Benzos", "Caff", "Cannabis",
                        "Choc", "Coke", "Crack", "Ecstasy", "Heroin", "Ketamine",
                        "Legalh", "LSD", "Meth", "Mushrooms", "Nicotine", "Semer", "VSA"


    Returns:

        A dict ordered by the drug consumption count with the following content
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
    return get_drug_consumption_by_age(age_range=params.age_range, drug=params.drug)
