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
        extra_kwargs = {
            'notes': {'required': False},
            'reaction_time': {'required': False},
            'sixty_foot_time': {'required': False},
            'three_thirty_foot_time': {'required': False},
            'eighth_mile_time': {'required': False},
            'quarter_mile_time': {'required': False},
            'trap_speed': {'required': False},
            'created_at': {'required': False}           
        }