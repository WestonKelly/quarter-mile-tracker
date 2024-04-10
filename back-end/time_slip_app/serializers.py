from rest_framework import serializers
from .models import TimeSlip

class TimeSlipSerializer(serializers.ModelSerializer):
    class Meta:
        model = TimeSlip
        fields = ['car',
                  'reaction_time',
                  'sixty_foot_time',
                  'three_thirty_foot_time',
                  'eighth_mile_time',
                  'quarter_mile_time',
                  'trap_speed',
                  'notes',
                  'created_at'
                  ]