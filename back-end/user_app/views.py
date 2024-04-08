from django.shortcuts import render
from django.core.exceptions import ValidationError
from django.contrib.auth import login, logout, authenticate
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import (
    HTTP_200_OK,
    HTTP_204_NO_CONTENT,
    HTTP_201_CREATED,
    HTTP_400_BAD_REQUEST
)
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.models import Token
from .models import Client

# Create your views here.
class Sign_Up(APIView):
    def post(self, request):
        try:
            email = request.data.get("email")
            password = request.data.get("password")
            new_user = Client.objects.create()
            new_user.set_password(password)
            new_user.save()
            token, _ = Token.objects.get_or_create(user=new_user)
            return Response({"client": new_user.email, "token": token.key}, status=HTTP_201_CREATED)
        except Exception as e:
            return Response(srt(e), status=HTTP_400_BAD_REQUEST)
        
