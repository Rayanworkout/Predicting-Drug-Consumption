from ninja import Router
from.by_population import by_population_router


repartition_router = Router()

repartition_router.add_router("/by_population", by_population_router)