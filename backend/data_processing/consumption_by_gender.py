from django.db.models import Count
from endpoints.models import Respondent


def get_drug_consumption_by_gender(gender: str, drug: str) -> None:
    """
    Function to display a bar chart showing the consumption of a given age range of a given drug.

    Parameters:
    - gender: str, gender to filter the dataset by, accepted values are male and female
    - drug: str, drug to display consumption for
    """

    data = (
        Respondent.objects.filter(gender=gender)
        .values(drug)
        .annotate(count=Count("id"))
        .order_by("-count")
    )

    counts = {item[drug]: item["count"] for item in data}

    data = {
        "gender": gender,
        "drug": drug,
        "data": counts,
    }
    return data
