# Generated by Django 4.1.4 on 2022-12-15 18:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sample_api', '0009_alter_image_img_alter_image_modified'),
    ]

    operations = [
        migrations.AddField(
            model_name='image',
            name='title',
            field=models.CharField(default='default_title', max_length=30),
        ),
    ]
