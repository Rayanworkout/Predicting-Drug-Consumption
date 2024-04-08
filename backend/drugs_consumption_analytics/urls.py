from django.contrib import admin
from django.urls import path

from drugs_consumption_analytics.api import api

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", api.urls),
]
