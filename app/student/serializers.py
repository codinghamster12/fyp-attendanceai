from rest_framework import serializers
from .models import Student, Attendance, studentImage
<<<<<<< HEAD
from .add_student import addImages
from .create_person import create_person
from .add_person_faces import get_faces
=======
>>>>>>> f7255974216ffce9301f06dd75f44086543f3dac

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
<<<<<<< HEAD
        student = Student.objects.create(

        Name=validated_data.get('Name', 'no-name'),
=======
        student = Student.objects.create(Name=validated_data.get('Name', 'no-name'),
>>>>>>> f7255974216ffce9301f06dd75f44086543f3dac
        Enrollment_No= validated_data.get('Enrollment_No', 'none'),
        Registration_No= validated_data.get('Registration_No', 'none'),
        Semester= validated_data.get('Semester', 0),
        Year= validated_data.get('Year', 'none'),
        Course_Name= validated_data.get('Course_Name', 'none'),
        Course_Code= validated_data.get('Course_Code', 'none'),
                                    )
        for image_data in images_data.values():
            studentImage.objects.create(student=student, image=image_data)
<<<<<<< HEAD
        Registration_No= validated_data.get('Registration_No', 'none')
        addImages(Registration_No)
        create_person(Registration_No)
        get_faces(Registration_No)


=======
>>>>>>> f7255974216ffce9301f06dd75f44086543f3dac
        return student  



class AttendanceSerializer(serializers.ModelSerializer):
    class Meta:
        model= Attendance
        fields= "__all__"

