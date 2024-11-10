from django.db.models import Count, Q
from endpoints.models import Respondent


def get_drug_consumption_by_category(
    category: str | list, value: str | list, drug: str
) -> None:
    """
    Function to display a bar chart showing the consumption of a given age range of a given drug.

    Parameters:
    - category: str or list, category to filter the dataset by. Example values: "age_range", "ethnicity", "education", "country" ...
    - values: str or list, value to filter the dataset by. Example values: "18-24", "25-34", "university degree", "male" ...
    - drug: str, drug to display consumption for
    """

    # Check if more than one category is being asked
    many_categories = type(category) == list and type(value) == list

    # If so, we create a dictionary that look like that:
    # {
    #  "age_range": "18-24",
    #  "education": "university degree",
    #     ...
    # }
    
    if many_categories:
        filters = {
            key: value
            for key, value in zip(
                category, value
            )  # creating a dictionary with the category and value to filter the queryset
        }
    else:
        # If there is only one category, we create a simple dictionary with one key-value pair
        filters = {category: value}

    if "age_range" in filters:
        filters["age"] = filters.pop("age_range")

    # Here is the most important part of the function
    # We are filtering the Respondent model by the filters dictionary
    # ** is used to unpack the dictionary into keyword arguments,
    # so we can apply many if needed
    data = (
        Respondent.objects.filter(**filters)
        .values(drug)
        .annotate(count=Count("id"))
        .order_by("-count")
    )

    # We compute the counts of the drug for each category
    counts = {item[drug]: item["count"] for item in data}

    # And finally, we return the data in a dictionary
    data = {
        **filters,
        "drug": drug,
        "data": counts,
    }

    return data
