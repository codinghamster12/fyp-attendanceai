from django.db import models

# Create your models here.

def get_upload_path(instance, filename):
    return 'uploads/{0}/{1}'.format(instance.student.Name, filename)



class Student(models.Model):
    Name=models.CharField(max_length=200, blank=False)
    Enrollment_No=models.CharField(max_length=200)
    Registration_No=models.CharField(max_length=200)
    Semester= models.IntegerField(blank=False, default=0)
    Year=models.CharField(max_length=200)
    Course_Name=models.CharField(max_length=200)
    Course_Code=models.CharField(max_length=200)
    personID= models.CharField(max_length=200, default=0)
    registered_at= models.DateField(auto_now_add=True)

    def __str__(self):
        return self.Name


    def save(self, *args, **kwargs):
        super(Student, self).save(*args, **kwargs)

    

class studentImage(models.Model):
    student= models.ForeignKey(Student, on_delete=models.CASCADE)
    image=models.ImageField(blank=True, upload_to= get_upload_path)

  





  
class Attendance(models.Model):
    course= models.CharField(max_length=200)
    semester= models.IntegerField()
    section= models.CharField(max_length=200)
    period= models.IntegerField()


    def __str__(self):
        return self.course


