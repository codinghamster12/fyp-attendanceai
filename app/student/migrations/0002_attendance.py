# Generated by Django 3.1.4 on 2020-12-23 09:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('student', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Attendance',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('course', models.CharField(max_length=200)),
                ('semester', models.IntegerField()),
                ('section', models.CharField(max_length=200)),
                ('period', models.IntegerField()),
            ],
        ),
    ]
