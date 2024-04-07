from ninja import Router
from .by_age import by_age_router
from .by_gender import by_gender_router
from .by_ethnicity import by_ethnicity_router
from .by_education import by_education_router
from .by_country import by_country_router

consumption_router = Router()

consumption_router.add_router("/by_age", by_age_router)
consumption_router.add_router("/by_gender", by_gender_router)
consumption_router.add_router("/by_ethnicity", by_ethnicity_router)
consumption_router.add_router("/by_education", by_education_router)
consumption_router.add_router("/by_country", by_country_router)
