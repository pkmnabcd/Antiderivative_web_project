from django.shortcuts import render
from django.conf  import settings
import json
import os
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse, HttpResponseNotAllowed
from django.forms.models import model_to_dict

from .models import Constant, Antiderivative, FilledAntiderivative
from .solving import parseAndEvaluateCurlys, removeCurlys

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
        modelDict["inputLatex"] = removeCurlys(modelDict["inputLatex"])
        for const in constants:
            modelDict[const.name] = const.name
        antiderivativeDicts[model.id] = modelDict
    return JsonResponse(antiderivativeDicts)

def getUser(req):
    if not req.user.is_anonymous:
        return JsonResponse({"user": model_to_dict(req.user)})
    else:
        return JsonResponse({})

@login_required
def getHistory(req):
    # NOTE: this tacetly assumes that this returns in order by id in ascending order.
    antiderivatives = req.user.filledantiderivative_set.all()
    antiderivatives = reversed(antiderivatives)

    antiderDicts = {}
    countNeeded = 10  # Only want the most recent 10.
    for antider in antiderivatives:
        if countNeeded == 0: break
        modelDict = model_to_dict(antider)
        antiderDicts[antider.id] = modelDict
        countNeeded -= 1
    return JsonResponse(antiderDicts)

def solveAndSaveAntiderivative(req):
    if req.method == "POST":
        body = json.loads(req.body)
        constants = body["constants"]
        antiderivativeId = body["antiderivativeId"]
        antiderivative = Antiderivative.objects.get(id=antiderivativeId)
        solutionTemplate = antiderivative.solutionTemplate
        inputLatex = antiderivative.inputLatex
        input = parseAndEvaluateCurlys(inputLatex, constants, isFirst=True)
        solution = parseAndEvaluateCurlys(solutionTemplate, constants, isFirst=True)
        if not req.user.is_anonymous:
            filledAntiderivative = FilledAntiderivative(preSolutionLatex=input, postSolutionLatex=solution, user=req.user)
            filledAntiderivative.save()
        return JsonResponse({"input": input, "solution": solution})
    return HttpResponseNotAllowed()
