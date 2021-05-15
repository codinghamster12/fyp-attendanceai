from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Student
from rest_framework import status
from .serializers import StudentSerializer, studentImageSerializer
from django.conf import settings
from .helpers import modify_input_for_multiple_files
from rest_framework import viewsets
from . import models
from . import serializers

from .add_student import addImages

import json






# Create your views here.

class StudentViewset(viewsets.ModelViewSet):
    queryset= models.Student.objects.all()
    serializer_class= serializers.StudentSerializer

@api_view(['POST'])
def takeImages(request):
    reg_no= json.loads(request.body.decode("utf-8"))
    addImages(reg_no['Registration_No'])
    return Response('Snapped pictures successfully')






