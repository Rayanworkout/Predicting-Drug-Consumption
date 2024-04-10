import pandas as pd

from endpoints.respondent_field_choices import DRUGS_LIST
from endpoints.models import Respondent, CorrelationMatrix

pd.set_option("future.no_silent_downcasting", True)


def get_correlation_matrix():
    """
    Function to get the correlation matrix between personality traits and drug usage. It helps show the relationship between the consumption
    of a given drug and the corresponding personality trait.

    See endpoint /correlation/drug_and_personality/ for more details.

    """
    respondents = Respondent.objects.all().values()

    df = pd.DataFrame(respondents)

    df[DRUGS_LIST] = (
        df[DRUGS_LIST]
        .replace(
            {
                "never used": 0,
                "used over a decade ago": 1,
                "used in last decade": 2,
                "used in last year": 3,
                "used in last month": 4,
                "used in last week": 5,
                "used in last day": 6,
            }
        )
        .infer_objects(copy=False)
    )

    corr_matrix = (
        df[
            [
                "neuroticism",
                "extraversion",
                "openness_to_experience",
                "agreeableness",
                "conscientiousness",
                "impulsive",
                "sensation_seeking",
            ]
            + DRUGS_LIST
        ]
        .corr()
        .iloc[:7, 7:]
    )

    correlation_data = corr_matrix.to_dict(orient="index")

    # Convert numpy float values to native Python float values
    correlation_data = {
        personality: {drug: float(value) for drug, value in traits.items()}
        for personality, traits in correlation_data.items()
    }

    return correlation_data


def save_correlation_matrix():
    """
    Function to save the correlation matrix between personality traits and drug usage in the database.

    """
    correlation_data = get_correlation_matrix()

    for personality, traits in correlation_data.items():
        for drug, value in traits.items():
            CorrelationMatrix.objects.create(
                personality_trait=personality, drug=drug, correlation=value
            )
