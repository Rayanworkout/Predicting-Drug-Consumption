from ninja import Router
from .consumption.router import consumption_router
from .repartition.router import repartition_router
from .correlation.router import correlation_router


main_router = Router()

main_router.add_router("/consumption/", consumption_router)
main_router.add_router("/repartition/", repartition_router)
main_router.add_router("/correlation/", correlation_router)
