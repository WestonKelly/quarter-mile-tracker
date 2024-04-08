from django.db import models
from time_slip_app import TimeSlip

# Create your models here.
class WeatherCondition(models.Model):
    time_slip = models.OneToOneField(TimeSlip, on_delete=models.CASCADE, related_name='weather_condition')
    temperature = models.FloatField(null=True, blank=True)
    relative_humidity = models.FloatField(null=True, blank=True)
    density_altitude = models.FloatField(null=True, blank=True)

    def __str__(self):
        return f"Weather condition for {self.time_slip}"