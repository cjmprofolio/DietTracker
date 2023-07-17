# Generated by Django 4.2.1 on 2023-07-17 22:42

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('diet', '0004_rename_resturant_menu_restaurant_alter_meal_date'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='restaurant',
            options={'ordering': ['place']},
        ),
        migrations.RenameField(
            model_name='restaurant',
            old_name='shop_name',
            new_name='place',
        ),
        migrations.AlterField(
            model_name='meal',
            name='date',
            field=models.DateField(default=datetime.datetime(2023, 7, 17, 22, 42, 16, 505684)),
        ),
    ]