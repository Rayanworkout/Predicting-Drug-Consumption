from ninja import Router

by_gender_router = Router()


@by_gender_router.get(
    "/",
    tags=["Consumption By Gender"],
)
def consumption_by_gender(
    request,
):
    """
    Endpoint to GET the consumptions statistics of a given drug for a given gender.

    Default values are set to "male" for gender and "meth" for drug.

    """

    return "Hello, World!"
