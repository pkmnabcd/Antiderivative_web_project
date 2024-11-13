from django.urls import path
from . import views

urlpatterns = [
    path('', view=views.index, name="index"),
    path("antiderivatives/", view=views.getAntiderivatives, name="getAntiderivatives"),
]
