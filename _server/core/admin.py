from django.contrib import admin
from .models import Antiderivative, Constant, FilledAntiderivative

# Register your models here.

admin.site.register(Antiderivative)
admin.site.register(FilledAntiderivative)
admin.site.register(Constant)
