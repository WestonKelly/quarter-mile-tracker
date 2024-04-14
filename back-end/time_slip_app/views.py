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
import openai
import os
from dotenv import load_dotenv

load_dotenv()

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
    
class UpdateTimeSlip(TokenReq):
    def put(self, request, time_slip_id):
        try:
            time_slip = TimeSlip.objects.get(pk=time_slip_id)
            if time_slip.car.user != request.user:
               return Response({"message": "Unauthorized"}, status=HTTP_403_FORBIDDEN)
        except TimeSlip.DoesNotExist:
             return Response({"message": "Time slip not found"}, status=HTTP_404_NOT_FOUND)
        serializer = TimeSlipSerializer(time_slip, data=request.data)
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
        
        openai.api_key = os.getenv("OPENAI_API_KEY")
        openai.api_key = openai.api_key

        prompt = f"""Generate a quarter mile racing time slip for a car with {car.horsepower} horsepower that weighs {car.weight}. Provide the response with the following data points: 
                'reaction_time':,
                'sixty_foot_time':,
                'three_thirty_foot_time':,
                'eighth_mile_time':,
                'quarter_mile_time':,
                'trap_speed':
        Provide values that are somewhat randomized but mostly realistic for a car with good traction and a track with good conditions."""

        openai_response = openai.Completion.create(
            engine="gpt-3.5-turbo",
            prompt=prompt,
            max_tokens=200,
            temperature=0.7
        )

        generated_time_slip = openai_response['choices'][0]['text']
        print(generated_time_slip)

