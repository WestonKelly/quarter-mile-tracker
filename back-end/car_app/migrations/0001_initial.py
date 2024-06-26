# Generated by Django 5.0.4 on 2024-04-08 06:50

import car_app.validators
import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Car',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('year', models.IntegerField(validators=[car_app.validators.validate_four_digits])),
                ('make', models.CharField(max_length=50)),
                ('model', models.CharField(max_length=50)),
                ('horsepower', models.IntegerField(blank=True, default=300, validators=[car_app.validators.validate_horsepower])),
                ('weight', models.IntegerField(blank=True, default=3000, validators=[car_app.validators.validate_weight])),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
