# Generated by Django 4.1.4 on 2022-12-13 10:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sample_api', '0003_product'),
    ]

    operations = [
        migrations.CreateModel(
            name='image',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=30)),
                ('img', models.ImageField(upload_to='images/')),
            ],
        ),
    ]
