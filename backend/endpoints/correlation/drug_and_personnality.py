from ninja import Query, Router

from data_processing.correlation_matrix import get_correlation_matrix

drug_and_personnality_router = Router(tags=["Correlation between drug and personnality"])


@drug_and_personnality_router.get(
    "/",
    tags=["Consumption by age"],
)
def consumption_by_age(
    request,
):
    """
    
    """

    return get_correlation_matrix()

