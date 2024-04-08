from django.urls import path
from .views import Sign_Up

urlpatterns = [
    path("signup/", Sign_Up.as_view(), name="signup"),
]