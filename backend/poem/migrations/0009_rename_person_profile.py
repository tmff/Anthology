# Generated by Django 4.1.7 on 2023-03-05 19:41

from django.conf import settings
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('poem', '0008_person_friends'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Person',
            new_name='Profile',
        ),
    ]
