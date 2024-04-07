from ninja import Router
from .drug_and_personnality import drug_and_personnality_router

correlation_router = Router()

correlation_router.add_router("/drug_and_personnality", drug_and_personnality_router)