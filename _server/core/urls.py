from django.urls import path
from . import views

urlpatterns = [
    path('', view=views.index, name="index"),
    path("user/", view=views.getUser, name="getUser"),
    path("antiderivatives/", view=views.getAntiderivatives, name="getAntiderivatives"),
]
