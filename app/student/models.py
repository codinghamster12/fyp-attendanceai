from django.db import models

# Create your models here.

class Student(models.Model):
    Name=models.CharField(max_length=200)
    Enrollment_No=models.CharField(max_length=200)
    Registration_No=models.CharField(max_length=200)
    Semester=models.IntegerField()
    Year=models.IntegerField()
    Course_Name=models.CharField(max_length=200)
    Course_Code=models.CharField(max_length=200)
    images = models.ImageField(upload_to ='uploads/') 
    registered_at= models.DateField(auto_now_add=True)


    def __str__(self):
        return self.Name