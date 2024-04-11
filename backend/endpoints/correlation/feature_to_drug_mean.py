from ninja import Router

from .schemas import MeanCorrelationResponse

from ..models import MeanCorrelationToFeature

drug_and_feature_router = Router(
    tags=["Mean correlation between each feature and drug consumption"]
)


@drug_and_feature_router.get(
    "/",
    tags=["Mean correlation between each feature and drug consumption"],
    response=MeanCorrelationResponse,
)
def drug_and_feature_mean_correlation(
    request,
):
    """
    This endpoint returns the mean correlation between each feature (age, country, Oscore, Escore ...) and drug usage, SORTED by correlation value.

    It answers questions like:
    - How does age correlate with drug usage ?
    - How does extraversion score correlate with drug usage ?

    Returns:
        
        {
        "sensation_seeking": 0.24750768760731,
        "impulsive": 0.183540814261658,
        "openness_to_experience": 0.182113572403621,
        "neuroticism": 0.0911577243029151,
        "ethnicity": 0.0727953856338882,
        "extraversion": -0.00596055422598115,
        "agreeableness": -0.10339419036207,
        "education": -0.110930351471219,
        "conscientiousness": -0.152633301185152,
        "gender": -0.158129047544186,
        "age": -0.192389301142749,
        "country": -0.250539529528625
        }
    """

    raw_data = MeanCorrelationToFeature.objects.all().values()

    # We construct the data fetched from the database into a more readable API response
    cleaned_data = {entry["feature"]:  entry["mean_correlation"] for entry in raw_data}
    
    sorted_data = dict(
        sorted(cleaned_data.items(), key=lambda item: item[1], reverse=True)
    )

    return sorted_data
