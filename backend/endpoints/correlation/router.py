from ninja import Router
from .drug_and_personality import drug_and_personality_router
from .feature_to_drug_mean import drug_and_feature_router

correlation_router = Router()

correlation_router.add_router("/drug_and_personality", drug_and_personality_router)
correlation_router.add_router("/feature_to_drug_mean", drug_and_feature_router)