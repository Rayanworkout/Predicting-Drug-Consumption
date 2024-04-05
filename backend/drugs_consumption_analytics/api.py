from ninja import NinjaAPI

api = NinjaAPI()


api.add_router("/", "endpoints.main_router.main_router")
