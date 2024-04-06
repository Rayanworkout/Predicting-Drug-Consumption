from django.db.models import Count
from endpoints.models import Respondent


def get_drug_consumption_by_category(category: str, value: str, drug: str) -> None:
    """
    Function to display a bar chart showing the consumption of a given age range of a given drug.

    Parameters:
    - category: str, category to filter the dataset by. Example values: "age_range", "ethnicity", "education", "country" ...
    - value: str, value to filter the dataset by. Example values: "18-24", "25-34", "university degree", "male" ...
    - drug: str, drug to display consumption for
    """

    data = (
        Respondent.objects.filter(**{f"{category}": value}) # using dictionary unpacking to filter the queryset, because "category" is not a field name
        .values(drug)
        .annotate(count=Count("id"))
        .order_by("-count")
    )

    counts = {item[drug]: item["count"] for item in data}

    category = "age_range" if category == "age" else category # fixing the category name for the response

    data = {
        category: value,
        "drug": drug,
        "data": counts,
    }
    return data
