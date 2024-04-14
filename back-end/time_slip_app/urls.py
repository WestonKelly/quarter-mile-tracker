from django.urls import path
from .views import CreateTimeSlip, DeleteTimeSlip, ReviewTimeSlip, UpdateTimeSlip, GenerateAiTime

urlpatterns = [
    path('create/<int:car_id>/', CreateTimeSlip.as_view(), name="create_time_slip"),
    path('generate/<int:car_id>/', GenerateAiTime.as_view(), name="generate_time"),
    path('delete/<int:time_slip_id>/', DeleteTimeSlip.as_view(), name="delete_time_slip"),
    path('review/<int:time_slip_id>/', ReviewTimeSlip.as_view(), name="review_time_slip"),
    path('update/<int:time_slip_id>/', UpdateTimeSlip.as_view(), name="update_time_slip"),
]