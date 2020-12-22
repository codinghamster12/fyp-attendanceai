from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework import status
from .serializers import RegistrationSerializer


# Create your views here.

@api_view(['GET'])
def apiOverview(request):
    api_urls={
       
        'Register': '/register/',
        'Login': '/login/'
    }
    return Response(api_urls)

@api_view(['POST'])
def logout(request):
    request.user.auth_token.delete()
    return Response({'message': 'Successfully logged out user'}, status= status.HTTP_200_OK)




@api_view(['POST'])
def registration_view(request):
    if request.method== 'POST':
        serializer= RegistrationSerializer(data= request.data)
        data={}
        if serializer.is_valid():
            account= serializer.save()
            data['message']= 'Successfully registered new user'
            data['email']= account.email
            data['username']= account.username
            token= Token.objects.get(user=account).key
            data['token']= token
            return Response(data, status= status.HTTP_201_CREATED)
        
        else:
            data= serializer.errors
            return Response(data, status= status.HTTP_400_BAD_REQUEST)

 



