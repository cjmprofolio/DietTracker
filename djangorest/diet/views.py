from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from url_filter.integrations.drf import DjangoFilterBackend
from .models import Restaurant, Menu, Meal
from diet.serializers import RestaurantSerializer, MenuSerializer, MealSerializer

# Create your views here.

class RestaurantViewset(viewsets.ModelViewSet):
    queryset= Restaurant.objects.all()
    serializer_class= RestaurantSerializer
    permission_classes= [IsAuthenticated]
    filter_backends = [DjangoFilterBackend]
    filter_fields = ['shop_name', 'location']

    def create(self, request, *args, **kwargs):
        # Perform validation
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        # Extract the relevant data from the validated serializer
        place = serializer.validated_data.get('shop_name')
        location = serializer.validated_data.get('location')

        # Check for duplicates
        duplicates = Restaurant.objects.filter(place=place, location=location).exists()
        if duplicates:
            return Response({'detail': 'The Restaurant is on the list.'}, status=status.HTTP_400_BAD_REQUEST)

        # Perform the creation
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)

        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

class MenuViewset(viewsets.ModelViewSet):
    queryset= Menu.objects.all()
    serializer_class= MenuSerializer
    permission_classes= [IsAuthenticated]
    filter_backends = [DjangoFilterBackend]
    filter_fields = ['resturant']

class MealViewset(viewsets.ModelViewSet):
    queryset= Meal.objects.all()
    serializer_class= MealSerializer
    permission_classes= [IsAuthenticated]
    filter_backends = [DjangoFilterBackend]
    filter_fields = ['date']

    def create(self, request, *args, **kwargs):
        # Perform validation
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        # Extract the relevant data from the validated serializer
        name = serializer.validated_data.get('name')
        date = serializer.validated_data.get('date')
        meal = serializer.validated_data.get('meal')

        # Check for duplicates
        duplicates = Meal.objects.filter(name=name, date=date, meal=meal).exists()
        if duplicates:
            return Response({'detail': 'This is duplicate Meal record.'}, status=status.HTTP_400_BAD_REQUEST)

        # Perform the creation
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)

        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)