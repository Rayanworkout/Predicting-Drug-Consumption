from django.db.models import Count
from endpoints.models import Respondent


def get_drug_consumption_by_age(age_range: str, drug: str) -> None:
    """
    Function to display a bar chart showing the consumption of a given age range of a given drug.

    Parameters:
    - age_range: str, age_range to filter the dataset by
    - drug: str, drug to display consumption for
    """

    data = (
        Respondent.objects.filter(age=age_range)
        .values(drug)
        .annotate(count=Count("id"))
        .order_by("-count")
    )

    counts = {item[drug]: item["count"] for item in data}

    data = {
        "age_range": age_range,
        "drug": drug,
        "data": counts,
    }
    return data
