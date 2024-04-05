from endpoints.models import Respondent
from django.db.models import Count


def get_population_repartition(population: str):
    """
    Returns the repartition of a given population in the database.
    """

    POPULATION_CHOICES = [
        "age",
        "country",
        "education",
        "gender",
        "ethnicity",
    ]

    population = population.lower()

    if population not in POPULATION_CHOICES:
        raise ValueError(f"Invalid argument: {population}.")

    population = (
        Respondent.objects.values(population)
        .annotate(count=Count(population))
        .order_by("-count")
    )

    return {
        "data": list(population),
    }
