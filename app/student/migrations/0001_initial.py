# Generated by Django 3.1.4 on 2020-12-11 17:05

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Student',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Name', models.CharField(max_length=200)),
                ('Enrollment_No', models.CharField(max_length=200)),
                ('Registration_No', models.CharField(max_length=200)),
                ('Semester', models.IntegerField()),
                ('Year', models.IntegerField()),
                ('Course_Name', models.CharField(max_length=200)),
                ('', models.CharField(max_length=200)),
                ('images', models.ImageField(upload_to='uploads/')),
                ('registered_at', models.DateField(auto_now_add=True)),
            ],
        ),
    ]
