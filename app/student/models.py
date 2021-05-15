from django.db import models

# Create your models here.

def get_upload_path(instance, filename):
    return 'uploads/{0}/{1}'.format(instance.student.Name, filename)


class Course(models.Model):
    Name=models.CharField(max_length=200, blank=False)

    def __str__(self):
        return self.Name


    def save(self, *args, **kwargs):
        super(Course, self).save(*args, **kwargs)


class Student(models.Model):
    Name=models.CharField(max_length=200, blank=False)
    Enrollment_No=models.CharField(max_length=200)
    Registration_No=models.CharField(max_length=200)
    Semester= models.IntegerField(blank=False, default=0)
    Section=models.CharField(max_length=200)
    Course= models.ManyToManyField(Course)
    personID= models.CharField(max_length=200, default=0)
    registered_at= models.DateField(auto_now_add=True)

    def __str__(self):
        return self.Name


    def save(self, *args, **kwargs):
        super(Student, self).save(*args, **kwargs)


class Faculty(models.Model):
    Name=models.CharField(max_length=200, blank=False)
    Course= models.ManyToManyField(Course)

    

    def __str__(self):
        return self.Name


    def save(self, *args, **kwargs):
        super(Faculty, self).save(*args, **kwargs)







       

class studentImage(models.Model):
    student= models.ForeignKey(Student, on_delete=models.CASCADE)
    image=models.ImageField(blank=True, upload_to= get_upload_path)

  





  



