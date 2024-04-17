from django.shortcuts import render
import os
from dotenv import load_dotenv
import requests
from django.http import JsonResponse
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

load_dotenv()
tomorrow_io_key = os.getenv('TOMORROW_IO_KEY')


# Create your views here.
class TokenReq(APIView):

    authentication_classes=[TokenAuthentication]
    permission_classes=[IsAuthenticated]

class GetWeather(TokenReq):
    def get(self, request):
        url = "https://api.tomorrow.io/v4/weather/realtime?location=las%20vegas&units=imperial&apikey=tH6L3GhrfSYurssZVkKuFz5nFkA7sx4H"
        headers = {"accept": "application/json"}
        response = requests.get(url, headers=headers)
        print(response.text)
        if response.status_code == 200:
            data = response.json()
            return JsonResponse(data, status=200)
        else:
            return JsonResponse({"error": "Failed to fetch weather data"}, status=500)