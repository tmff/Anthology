# Generated by Django 4.1.7 on 2023-03-05 19:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('poem', '0007_rename_author_person'),
    ]

    operations = [
        migrations.AddField(
            model_name='person',
            name='friends',
            field=models.ManyToManyField(to='poem.person'),
        ),
    ]
