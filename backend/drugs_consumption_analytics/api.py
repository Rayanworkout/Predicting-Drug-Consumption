from ninja import NinjaAPI

api = NinjaAPI()


api.add_router("/consumption/", "endpoints.consumption.by_age.router")