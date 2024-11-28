from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Antiderivative(models.Model):
    id = models.BigAutoField(primary_key=True)
    inputLatex = models.TextField()
    solutionTemplate = models.TextField()

class FilledAntiderivative(models.Model):
    id = models.BigAutoField(primary_key=True)
    preSolutionLatex = models.TextField()
    postSolutionLatex = models.TextField()
    user = models.ForeignKey("auth.User", on_delete=models.CASCADE)

class Constant(models.Model):
    id = models.BigAutoField(primary_key=True)
    name = models.TextField()
    antiderivative = models.ForeignKey("Antiderivative", on_delete=models.CASCADE)

