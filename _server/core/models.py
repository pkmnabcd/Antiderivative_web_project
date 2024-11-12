from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Antiderivative(models.Model):
    id = models.BigAutoField(primary_key=True)
    latexText = models.TextField()
    user = models.ForeignKey("auth.User", on_delete=models.CASCADE)

class Constant(models.Model):
    id = models.BigAutoField(primary_key=True)
    name = models.TextField()
    value = models.FloatField()
    antiderivative = models.ForeignKey("Antiderivative", on_delete=models.CASCADE)

