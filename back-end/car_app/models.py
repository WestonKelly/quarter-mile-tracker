from django.db import models
from user_app import Client
from .validators import validate_four_digits, validate_horsepower, validate_weight

# Create your models here.
class Car(models.Model):
    user = models.ForeignKey(Client, on_delete=models.CASCADE)
    year = models.IntegerField(validators=[validate_four_digits])
    make = models.CharField(max_length=50)
    model = models.CharField(max_length=50)
    horsepower = models.IntegerField(blank=True, default=300, validators=[validate_horsepower])
    weight = models.IntegerField(blank=True, default=3000, validators=[validate_weight])

    def __str__(self):
        return f"{self.year} {self.make} {self.model}"
