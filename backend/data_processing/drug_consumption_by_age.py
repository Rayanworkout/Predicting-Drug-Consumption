from api.models import Respondent

from api.respondent_field_choices import AGE_CHOICES, DRUGS_LIST


def get_drug_consumption_by_age(
    age_range: str = "18-24", drug: str = "Alcohol"
) -> None:
    """
    Function to display a bar chart showing the which age range consumes the most of a given drug.

    Parameters:
    - df: pandas DataFrame containing the dataset
    - age_range: str, age range to filter the dataset by
    - drug: str, drug to display consumption for
    """
    age_choices = [choice[0] for choice in AGE_CHOICES]

    if age_range not in age_choices:
        raise ValueError(f"age_range must be one of {age_choices}")

    if drug not in DRUGS_LIST:
        raise ValueError(f"drug must be one of {DRUGS_LIST}")

    data = Respondent.objects.filter(age=age_range).values_list(drug, flat=True)

    return data
