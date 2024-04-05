from ninja import Schema
from typing import List



####################################################################################################
# POPULATION REPARTITION
####################################################################################################


class PopulationRepartitionResponse(Schema):
    """
    Response schema for population_repartition endpoint.
    it defines the fields returned by the endpoint.

    https://django-ninja.dev/guides/response/
    """

    data: List[dict]


class PopulationRepartitionErrorResponse(Schema):
    """
    Error response schema for population_repartition endpoint. In case population is not valid.
    """

    message: str


class PopulationRepartitionRequest(Schema):
    """
    Request schema for population_repartition endpoint.
    it defines the fields expected by the endpoint.

    https://django-ninja.dev/guides/request/
    """

    population: str = "age"
