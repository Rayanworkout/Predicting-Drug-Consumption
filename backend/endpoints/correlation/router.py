from ninja import Router
from .drug_and_personality import drug_and_personality_router

correlation_router = Router()

correlation_router.add_router("/drug_and_personality", drug_and_personality_router)
