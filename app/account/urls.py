from django.urls import path
from . import views

from rest_framework.authtoken.views import obtain_auth_token

urlpatterns=[
    path('', views.apiOverview, name="api-overview"),
    path('register/', views.registration_view, name='register'),
    path('login/', obtain_auth_token, name='login')




]