from django.shortcuts import render
from rest_framework.status import (
    HTTP_201_CREATED, 
    HTTP_400_BAD_REQUEST,
    HTTP_404_NOT_FOUND,
    HTTP_204_NO_CONTENT,
    HTTP_200_OK,
)
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from .models import Car
from .serializers import CarSerializer

# Create your views here.

class TokenReq(APIView):

    authentication_classes=[TokenAuthentication]
    permission_classes=[IsAuthenticated]

class CreateCar(TokenReq):
    def post(self, request):
        serializer = CarSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=HTTP_201_CREATED)
        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)
    
class DeleteCar(TokenReq):
    def delete(self, request, car_id):
        try:
            car = Car.objects.get(pk=car_id, user=request.user)
        except Car.DoesNotExist:
            return Response({"message": "Car not found"}, status=HTTP_404_NOT_FOUND)
        car.delete()
        return Response({"message": "Car deleted successfully"}, status=HTTP_204_NO_CONTENT)
    
class UpdateCar(TokenReq):
    def put(self, request, car_id):
        try:
            car = Car.objects.get(pk=car_id, user=request.user)
        except Car.DoesNotExist:
            return Response({"message": "Car not found"}, status=HTTP_404_NOT_FOUND)
        serializer = CarSerializer(car, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=HTTP_200_OK)
        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)
    
class ReviewCar(TokenReq):
    def get(self, request, car_id):
        try:
            car = Car.objects.get(pk=car_id, user=request.user)
        except Car.DoesNotExist:
            return Response({"message": "Car found "}, status=HTTP_404_NOT_FOUND)
        serializer = CarSerializer(car)
        return Response(serializer.data, status=HTTP_200_OK)
    
class UserCars(TokenReq):
    def get(self, request):
        cars = Car.objects.filter(user=request.user)
        print(cars)
        print(request)
        if not cars:
            return Response({"message": "User has no cars"}, status=HTTP_404_NOT_FOUND)
        serializer = CarSerializer(cars, many=True)
        return Response(serializer.data, status=HTTP_200_OK)
        
