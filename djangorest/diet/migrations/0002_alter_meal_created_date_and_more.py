# Generated by Django 4.2.1 on 2023-05-24 07:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('diet', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='meal',
            name='created_date',
            field=models.DateTimeField(auto_now_add=True),
        ),
        migrations.AlterField(
            model_name='meal',
            name='lastest_revised_date',
            field=models.DateTimeField(auto_now=True),
        ),
    ]
