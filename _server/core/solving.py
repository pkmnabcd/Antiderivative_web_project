def evaluateFinishedCurlys(inside, constants):
    if len(substring) == 1:
        # Assume this is a constant
        return str(constants[substring])
    else:
        print("Implement me")

def findMatchingCurlys(substring):
    openCurlysList = []
    closeCurlysList = []

    # TODO: Update below with the new variable names and structure
    currentIndex = 0
    curlyCount = 0
    # TODO: Make sure the case {{{{a}}+1}} is handled (skip an index when {{ or }} found
    while currentIndex < len(substring) - 1:
        print(currentIndex)
        print(substring[currentIndex : currentIndex + 2])
        if substring[currentIndex : currentIndex + 2] == "{{":
            if curlyCount == 0:
                openCurlysList.append(currentIndex)
            curlyCount += 1
            currentIndex += 2
        elif substring[currentIndex : currentIndex + 2] == "}}":
            curlyCount -= 1
            if curlyCount == 0:
                closeCurlysList.append(currentIndex)
            currentIndex += 2
        else:
            currentIndex += 1

    return openCurlysList, closeCurlysList

def parseAndEvaluateCurlys(substring, constants, isFirst):
    """
    This function is recursive. It takes the solution template, and returns the evaluated text
    """
    firstCurlys = substring.find("{{")
    lastCurlys = substring.rfind("}}")
    print(firstCurlys)
    print(lastCurlys)
    haveBothSets = not (firstCurlys == -1 and lastCurlys == -1)
    haveNeitherSets = firstCurlys == -1 and lastCurlys == -1
    if haveBothSets:
        innerSubstring = substring[firstCurlys + 2 : lastCurlys]
        print(innerSubstring)
        replaceString = parseAndEvaluateCurlys(innerSubstring, constants, False)
        substring = substring.replace(innerString, replaceString)
        if isFirst:
            return substring
        else:
            return evaluateFinishedCurlys(substring, constants)
        # TODO: repeat in case there are more  to do? Evaluate ?

    elif haveNeitherSets:
        print("No Curlys")
        if isFirst:
            return substring
        else:
            return evaluateFinishedCurlys(substring, constants)
    else:
        print("Unexpected Input")
        return "Error! Unexpected Input inside brackets"
