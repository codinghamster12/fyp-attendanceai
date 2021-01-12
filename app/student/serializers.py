from rest_framework import serializers
from .models import Student, Attendance, studentImage

class studentImageSerializer(serializers.ModelSerializer):
    class Meta:
        model= studentImage
        fields=('image',)

class StudentSerializer(serializers.HyperlinkedModelSerializer):
    
    images= studentImageSerializer(source='studentimage_set', many=True, read_only=True)

    class Meta:
        model=Student
        fields=('id', 'Name', 'Enrollment_No', 'Registration_No', 'Semester', 'Year', 'Course_Name', 'Course_Code', 'registered_at', 'images')


    def create(self, validated_data):
        images_data = self.context.get('view').request.FILES
        student = Student.objects.create(Name=validated_data.get('Name', 'no-name'),
        Enrollment_No= validated_data.get('Enrollment_No', 'none'),
        Registration_No= validated_data.get('Registration_No', 'none'),
        Semester= validated_data.get('Semester', 0),
        Year= validated_data.get('Year', 'none'),
        Course_Name= validated_data.get('Course_Name', 'none'),
        Course_Code= validated_data.get('Course_Code', 'none'),
                                    )
        for image_data in images_data.values():
            studentImage.objects.create(student=student, image=image_data)
        return student  



class AttendanceSerializer(serializers.ModelSerializer):
    class Meta:
        model= Attendance
        fields= "__all__"

