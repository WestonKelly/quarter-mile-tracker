from django.db import models
from django.contrib.auth.models import AbstractUser


# Create your models here.
class Client(AbstractUser):
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=50, unique=False)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.email