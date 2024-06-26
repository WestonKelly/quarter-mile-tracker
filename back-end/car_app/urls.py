from django.urls import path
from .views import CreateCar, DeleteCar, UpdateCar, ReviewCar, UserCars

urlpatterns = [
    path('create/', CreateCar.as_view(), name="create_cars"),
    path('delete/<int:car_id>/', DeleteCar.as_view(), name="delete_car"),
    path('update/<int:car_id>/', UpdateCar.as_view(), name="update_car"),
    path('review/<int:car_id>/', ReviewCar.as_view(), name="review_car"),
    path('all/', UserCars.as_view(), name="all_cars")
]