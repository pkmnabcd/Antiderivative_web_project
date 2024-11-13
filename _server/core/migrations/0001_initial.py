# Generated by Django 5.1.3 on 2024-11-12 22:35

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Antiderivative',
            fields=[
                ('id', models.BigAutoField(primary_key=True, serialize=False)),
                ('latexText', models.TextField()),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Constant',
            fields=[
                ('id', models.BigAutoField(primary_key=True, serialize=False)),
                ('name', models.TextField()),
                ('value', models.FloatField()),
                ('antiderivative', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.antiderivative')),
            ],
        ),
    ]