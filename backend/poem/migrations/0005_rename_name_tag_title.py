# Generated by Django 4.1.7 on 2023-03-02 20:55

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('poem', '0004_tag_poem_tags'),
    ]

    operations = [
        migrations.RenameField(
            model_name='tag',
            old_name='name',
            new_name='title',
        ),
    ]
