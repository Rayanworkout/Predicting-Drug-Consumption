from ninja import Router, Query
from endpoints.models import Respondent
from django.db.models import Count
from endpoints.respondent_field_choices import DRUGS_LIST

by_many_params_router = Router(tags=["Consumption by many params"])

@by_many_params_router.get(
    "/",
    response={200: dict, 400: dict},
    tags=["Consumption by many params"],
)
def consumption_by_many_params(request, params: Query):
    drug = params.drug

    # Vérification de la drogue
    if drug not in DRUGS_LIST:
        return 400, {"message": "Invalid drug name", "allowed_values": DRUGS_LIST}

    categories = params.category.split(",")
    values = params.value.split(",")

    # Validation pour s'assurer que le nombre de catégories et de valeurs est le même
    if len(categories) != len(values):
        return 400, {"message": "Number of categories and values must match"}

    # Création du filtre
    filters = {}
    for category, value in zip(categories, values):
        if category == "age_range":
            category = "age"
        filters[category] = value.strip()

    # Filtrage des données
    data = (
        Respondent.objects.filter(**filters)
        .values(drug)
        .annotate(count=Count("id"))
        .order_by("-count")
    )

    # Calcul des comptages de la consommation de médicaments pour chaque catégorie
    counts = {item[drug]: item["count"] for item in data}

    # Préparation de la réponse
    response_data = {
        "categories": {category: value for category, value in zip(categories, values)},
        "drug": drug,
        "data": counts,
    }

    return 200, response_data
