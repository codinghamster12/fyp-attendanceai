# Generated by Django 3.1.4 on 2021-05-12 09:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('student', '0006_auto_20210511_1535'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='faculty',
            name='Course_Id',
        ),
        migrations.RemoveField(
            model_name='student',
            name='Course_Id',
        ),
        migrations.RemoveField(
            model_name='student',
            name='Course_Name',
        ),
        migrations.AddField(
            model_name='faculty',
            name='Course',
            field=models.ManyToManyField(to='student.Course'),
        ),
        migrations.AddField(
            model_name='student',
            name='Course',
            field=models.ManyToManyField(to='student.Course'),
        ),
    ]
