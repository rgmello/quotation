# Generated by Django 4.2.5 on 2023-10-04 17:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('stock_quotes', '0002_alter_user_email'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='first_name',
            field=models.CharField(max_length=150, verbose_name='first name'),
        ),
        migrations.AlterField(
            model_name='user',
            name='last_name',
            field=models.CharField(max_length=150, verbose_name='last name'),
        ),
    ]
