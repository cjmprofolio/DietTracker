from django.conf.urls import include
from django.urls import path
from rest_framework.routers import DefaultRouter
from diet import views

routers= DefaultRouter()
routers.register(r'restaurant', views.RestaurantViewset)
routers.register(r'menu', views.MenuViewset)
routers.register(r'meal', views.MealViewset)

urlpatterns = [
    path('', include(routers.urls)),
    
]