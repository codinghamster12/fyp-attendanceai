from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Student
from .serializers import StudentSerializer
# Create your views here.
@api_view(['GET'])
def studentsOverview(request):
    student_urls={
        'List': '/student-list/',
        'Detail View': '/student-detail/<str:pk>/',
        'Create': '/student-create/',
        'Update': '/student-update/<str:pk>/',
        'Delete': '/student-delete/<str:pk>/'
    }
    return Response(student_urls)

@api_view(['GET'])
def studentList(request):
    students=Student.objects.all()
    serializer=StudentSerializer(students,many=True)
    return Response(serializer.data)

@api_view(['GET'])
def studentDetail(request,pk):
    students=Student.objects.get(id=pk)
    serializer=StudentSerializer(students,many=False)
    return Response(serializer.data)


@api_view(['POST'])
def studentCreate(request):
    serializer=StudentSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
        serializer.save()
    else:
        print('Hello World')
    return Response(serializer.data)

@api_view(['POST'])
def studentUpdate(request,pk):
    student=Student.objects.get(id=pk)
    serializer=StudentSerializer(instance=student,data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

@api_view(['DELETE'])
def studentDelete(request,pk):
    student=Student.objects.get(id=pk)
    student.delete()
    return Response('Student successfully deleted!')
