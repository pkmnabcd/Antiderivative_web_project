from django.shortcuts import render
from django.conf  import settings
import json
import os
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.forms.models import model_to_dict

from .models import FilledConstant, Constant, Antiderivative, FilledAntiderivative

# Load manifest when server launches
MANIFEST = {}
if not settings.DEBUG:
    f = open(f"{settings.BASE_DIR}/core/static/manifest.json")
    MANIFEST = json.load(f)

# Create your views here.
def index(req):
    context = {
        "asset_url": os.environ.get("ASSET_URL", ""),
        "debug": settings.DEBUG,
        "manifest": MANIFEST,
        "js_file": "" if settings.DEBUG else MANIFEST["src/main.ts"]["file"],
        "css_file": "" if settings.DEBUG else MANIFEST["src/main.ts"]["css"][0]
    }
    return render(req, "core/index.html", context)

def getAntiderivatives(req):
    antiderivatives = Antiderivative.objects.all()
    antiderivativeDicts = {}
    for model in antiderivatives:
        constants = model.constant_set.all()
        modelDict = model_to_dict(model)
        for const in constants:
            modelDict[const.name] = const.value
        antiderivativeDicts[model.id] = modelDict
    return JsonResponse(antiderivativeDicts)

def getUser(req):
    if not req.user.is_anonymous:
        return JsonResponse({"user": model_to_dict(req.user)})
    else:
        return JsonResponse({})

@login_required
def getHistory(req):
    print(req.user)
    return JsonResponse({})
