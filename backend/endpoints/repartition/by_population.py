from ninja import Query, Router

from data_processing import get_population_repartition

from .schemas import (
    PopulationRepartitionResponse,
    PopulationRepartitionRequest,
    PopulationRepartitionErrorResponse,
)

by_population_router = Router()


@by_population_router.get(
    "/by_population",
    response={
        200: PopulationRepartitionResponse,
        400: PopulationRepartitionErrorResponse,
    },
    tags=["Repartition by Population"],
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
