from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Student
from rest_framework import status
from .serializers import StudentSerializer, AttendanceSerializer, studentImageSerializer
from django.conf import settings
from .helpers import modify_input_for_multiple_files
from rest_framework import viewsets
from . import models
from . import serializers

import os
import cv2
from imutils import paths
import numpy as np
import imutils
import pickle

from sklearn.preprocessing import LabelEncoder
from sklearn.svm import SVC

from imutils.video import VideoStream
from imutils.video import FPS
import time






# Create your views here.

class StudentViewset(viewsets.ModelViewSet):
    queryset= models.Student.objects.all()
    serializer_class= serializers.StudentSerializer






