from rest_framework import serializers
from .models import Restaurant, Menu, Meal

class RestaurantSerializer(serializers.ModelSerializer):
    class Meta:
        model= Restaurant
        fields= '__all__'

class MenuSerializer(serializers.ModelSerializer):
    restaurant= RestaurantSerializer()

    class Meta:
        model= Menu
        fields= '__all__'

class MealSerializer(serializers.ModelSerializer):
    food = MenuSerializer(many=True)
    # food= serializers.SlugRelatedField(many=True, queryset=Menu.objects.all(), slug_field='food_name')
    
    class Meta:
        model= Meal
        fields= '__all__'
    
    def create(self, validated_data):
        food_set= validated_data.pop('food')

        meal_instance= Meal.objects.create(**validated_data)
        
        for food in food_set:
            # search the existing restaurant information
            restaurant= food.pop('restaurant')
            res_instance= Restaurant.objects.get(**restaurant)

            # create a menu for your meal 
            menu, _ = Menu.objects.get_or_create(restaurant=res_instance, **food)
            
            # add menu to food
            meal_instance.food.add(menu)

        return meal_instance
    
    def update(self, instance, validated_data):
        new_food_set= validated_data.pop('food')

        for key, value in validated_data.items():
           setattr(instance, key, value)

        instance.food.clear()

        for food in new_food_set:
            restaurant= food.pop('restaurant')
            res_instance= Restaurant.objects.get(**restaurant)
            menu, _= Menu.objects.get_or_create(restaurant=res_instance, **food)
            instance.food.add(menu)

        instance.save()

        return instance