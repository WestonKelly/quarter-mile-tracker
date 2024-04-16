import os
import json
from dotenv import load_dotenv
from django.shortcuts import render
from rest_framework.status import (
    HTTP_201_CREATED, 
    HTTP_400_BAD_REQUEST,
    HTTP_404_NOT_FOUND,
    HTTP_204_NO_CONTENT,
    HTTP_200_OK,
    HTTP_403_FORBIDDEN
)
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from .models import TimeSlip, Car
from .serializers import TimeSlipSerializer
from openai import OpenAI

load_dotenv()
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))


# Create your views here.
class TokenReq(APIView):

    authentication_classes=[TokenAuthentication]
    permission_classes=[IsAuthenticated]

class CreateTimeSlip(TokenReq):
    def post(self, request, car_id):
        try:
            car = Car.objects.get(pk=car_id, user=request.user)
        except Car.DoesNotExist:
            return Response({"message": "Car not found"}, status=HTTP_404_NOT_FOUND)
        data = {'car': car_id, **request.data}
        serializer = TimeSlipSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=HTTP_201_CREATED)
        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)

class DeleteTimeSlip(TokenReq):
    def delete(self, request, time_slip_id):
        try:
            time_slip = TimeSlip.objects.get(pk=time_slip_id)
            if time_slip.car.user != request.user:
                return Response({"message": "Unauthorized"}, status=HTTP_403_FORBIDDEN)
        except TimeSlip.DoesNotExist:
            return Response({"message": "Time slip not found"}, status=HTTP_404_NOT_FOUND)
        time_slip.delete()
        return Response({"message": "Time slip deleted"}, status=HTTP_204_NO_CONTENT)

class ReviewTimeSlip(TokenReq):
    def get(self, request, time_slip_id):
        try:
            time_slip = TimeSlip.objects.get(pk=time_slip_id)
            if time_slip.car.user != request.user:
               return Response({"message": "Unauthorized"}, status=HTTP_403_FORBIDDEN)
        except TimeSlip.DoesNotExist:
             return Response({"message": "Time slip not found"}, status=HTTP_404_NOT_FOUND)
        serializer = TimeSlipSerializer(time_slip)
        return Response(serializer.data, status=HTTP_200_OK)
    
class TimeSlipsByCar(TokenReq):
    def get(self, request, car_id):
        try:
            user = request.user
            time_slips = TimeSlip.objects.filter(car__id=car_id, car__user=user)
        except TimeSlip.DoesNotExist:
            return Response({"message": "Time slips not found"}, status=HTTP_404_NOT_FOUND)
        serializer = TimeSlipSerializer(time_slips, many=True)
        return Response(serializer.data, status=HTTP_200_OK)

class UpdateTimeSlip(TokenReq):
    def put(self, request, time_slip_id):
        try:
            time_slip = TimeSlip.objects.get(pk=time_slip_id)
            if time_slip.car.user != request.user:
               return Response({"message": "Unauthorized"}, status=HTTP_403_FORBIDDEN)
        except TimeSlip.DoesNotExist:
             return Response({"message": "Time slip not found"}, status=HTTP_404_NOT_FOUND)
        serializer = TimeSlipSerializer(time_slip, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=HTTP_200_OK)
        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)

class GenerateAiTime(TokenReq):
    def post(self, request, car_id):
        try:
            car = Car.objects.get(pk=car_id, user=request.user)
        except Car.DoesNotExist:
            return Response({"message": "Car not found"}, status=HTTP_404_NOT_FOUND)


        openai_response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
            {
                "role": "system",
                "content": """You will be provided the weight and horsepower numbers for a car and your task is to generate a quarter mile drag racing time slip with the following data points in a json format:
                'reaction_time':,
                'sixty_foot_time':,
                'three_thirty_foot_time':,
                'eighth_mile_time':,
                'quarter_mile_time':,
                'trap_speed':
                 and provide values that are slightly randomized so that the values are not round but still mostly accurate for a car with good traction of a track with good conditions."""
            },
            {
                "role": "user",
                "content": f"This particular car produces {car.horsepower} and weighs {car.weight} pounds."
            }
            ],
            temperature=0.7,
            max_tokens=200,
            top_p=1,
            frequency_penalty=0,
            presence_penalty=0
        )

        generated_time_slip = openai_response.choices[0].message.content
        print(generated_time_slip)
        print(f"Type of data is: {type(generated_time_slip)}")

        response_data_str = generated_time_slip
        try:
            response_data = json.loads(response_data_str)
        except json.JSONDecodeError as e:
            print("Error decoding JSON:", e)
            return Response({"message": "Error decoding JSON"}, status=HTTP_400_BAD_REQUEST)
        
        reaction_time = response_data.get("reaction_time")
        sixty_foot_time = response_data.get("sixty_foot_time")
        three_thirty_foot_time = response_data.get("three_thirty_foot_time")
        eighth_mile_time = response_data.get("eighth_mile_time")
        quarter_mile_time = response_data.get("quarter_mile_time")
        trap_speed = response_data.get("trap_speed")

        time_slip_data = {
            "car": car_id,
            "reaction_time": reaction_time,
            "sixty_foot_time": sixty_foot_time,
            "three_thirty_foot_time": three_thirty_foot_time,
            "eighth_mile_time": eighth_mile_time,
            "quarter_mile_time": quarter_mile_time,
            "trap_speed": trap_speed
        }

        serializer = TimeSlipSerializer(data=time_slip_data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=HTTP_201_CREATED)
        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)

