from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='puppy-home'),
    path('about/', views.about, name='puppy-about'),

]
