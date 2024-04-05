from ninja import Router
from .consumption.by_age import by_age_router
from .repartition.by_population import by_population_router


main_router = Router()

main_router.add_router("/consumption/", by_age_router)
main_router.add_router("/repartition/", by_population_router)
