from django.core.exceptions import ValidationError

def validate_four_digits(value):
    if len(str(value)) != 4:
        raise ValidationError('Year must be four digits')
    
def validate_horsepower(value):
    if value < 1:
        raise ValidationError('Horsepower must be greater than 0')
    elif value > 2000:
        raise ValidationError('Horsepower cannot be more than 2,000')
    
def validate_weight(value):
    if value < 100:
        raise ValidationError('Weight cannot be less than 100 lbs')
    elif value > 80000:
        raise ValidationError('Weight cannot exceed 80,000 lbs')