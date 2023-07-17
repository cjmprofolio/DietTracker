from django.db import models
from django.utils import timezone
from django.core.validators import MinValueValidator, MinLengthValidator

class Restaurant(models.Model):
    place= models.CharField(max_length=20, validators=[MinLengthValidator(1)])
    location= models.CharField(max_length=50, validators=[MinLengthValidator(1)])
    created_date= models.DateTimeField(auto_now_add= True)
    lastest_revised_date= models.DateTimeField(auto_now= True)

    class Meta:
        ordering=['place']

    def __str__(self) -> str:
        return f'{self.place}'

class Menu(models.Model):
    food_name= models.CharField(max_length=30, validators=[MinLengthValidator(1)])
    ingredients= models.TextField()
    calorie= models.IntegerField(help_text='The unit is kcal', validators=[
        MinValueValidator(1, message="Value must be greater than or equal to 1.")
    ])
    price= models.IntegerField(help_text='The unit is $NT', validators=[
        MinValueValidator(1, message="Value must be greater than or equal to 1.")
    ])
    restaurant= models.ForeignKey(Restaurant, on_delete=models.CASCADE, related_name='menu')
    created_date= models.DateTimeField(auto_now_add= True)
    lastest_revised_date= models.DateTimeField(auto_now= True)

    class Meta:
        ordering=['food_name']

    def __str__(self) -> str:
        return f'{self.food_name}-{self.restaurant}'

# Create your models here.
MEAL_CHOICES=[
    ('Breakfast', 'Breakfast'),
    ('Brunch', 'Brunch'),
    ('Lunch', 'Lunch'),
    ('Dinner', 'Dinner'),
    ('Dessert', 'Dessert'),
    ('Midnight Snack', 'Midnight Snack')
]

class Meal(models.Model):

    name= models.CharField(max_length=20, validators=[MinLengthValidator(1)])
    date= models.DateField(default=timezone.now())
    meal= models.CharField(choices=MEAL_CHOICES, default='Breakfast',max_length=20 , validators=[MinLengthValidator(1)])
    food= models.ManyToManyField(Menu)
    created_date= models.DateTimeField(auto_now_add= True)
    lastest_revised_date= models.DateTimeField(auto_now= True)


    def __str__(self):
        return f'{self.date} {self.meal}'