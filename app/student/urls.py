from django.urls import path, include
from rest_framework import routers
from . import views

router= routers.DefaultRouter()
router.register('student', viewset= views.StudentViewset)
urlpatterns = [
    
  
  

<<<<<<< HEAD
    path('', include(router.urls))
    
=======
    path('', include(router.urls)),
    path('attendance/',views.takeAttendance,name="attendance"),
    path('embeddings/', views.createEmbeddings, name='embeddings'),
    path('train/', views.train, name='train'),
    path('detect/', views.detect, name='detect'),
>>>>>>> f7255974216ffce9301f06dd75f44086543f3dac




]