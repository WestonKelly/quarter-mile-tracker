from django.db import models
from car_app import Car

# Create your models here.
class TimeSlip(models.Model):
    car = models.ForeignKey(Car, on_delete=models.CASCADE)
    reaction_time = models.FloatField()
    sixty_foot_time = models.FloatField()
    three_thirty_foot_time = models.FloatField()
    eighth_mile_time = models.FloatField()
    quarter_mile_time = models.FloatField()
    trap_speed = models.FloatField()
    notes = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Time slip for {self.car}"