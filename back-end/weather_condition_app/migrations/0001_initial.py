# Generated by Django 5.0.4 on 2024-04-08 06:50

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('time_slip_app', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='WeatherCondition',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('temperature', models.FloatField(blank=True, null=True)),
                ('relative_humidity', models.FloatField(blank=True, null=True)),
                ('density_altitude', models.FloatField(blank=True, null=True)),
                ('time_slip', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='weather_condition', to='time_slip_app.timeslip')),
            ],
        ),
    ]
