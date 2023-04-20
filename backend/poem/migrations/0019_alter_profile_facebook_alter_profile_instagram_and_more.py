# Generated by Django 4.1.7 on 2023-04-11 15:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('poem', '0018_profile_facebook_profile_instagram_profile_name_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='facebook',
            field=models.URLField(blank=True, default=''),
        ),
        migrations.AlterField(
            model_name='profile',
            name='instagram',
            field=models.URLField(blank=True, default=''),
        ),
        migrations.AlterField(
            model_name='profile',
            name='twitter',
            field=models.URLField(blank=True, default=''),
        ),
    ]