def evaluateFinishedCurlys(inside, constants):
    if len(inside) == 1:
        # Assume this is a constant
        return str(constants[inside])
    else:
        print("Implement me")

def findMatchingCurlys(substring):
    openCurlysList = []
    closeCurlysList = []

    currentIndex = 0
    curlyCount = 0
    while currentIndex < len(substring) - 1:
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
    openCurlysList, closeCurlysList = findMatchingCurlys(substring)
    unequalCurlys = len(openCurlysList) != len(closeCurlysList)
    innerCurlysPresent = len(openCurlysList) != 0

    if unequalCurlys:
        print("Unexpected Input")
        return "Error! Unexpected Input inside brackets"
    elif innerCurlysPresent:
        curlyCount = len(openCurlysList)
        # NOTE: This is banking on there not being identical inner substrings, which *should* be fine for now.
        substringsToReplace = []
        for i in range(curlyCount):
            openCurlyIndex = openCurlysList[i]
            closeCurlyIndex = closeCurlysList[i]
            substringsToReplace.append(substring[openCurlyIndex + 2 : closeCurlyIndex])
        print(substringsToReplace)

        for innerSubstring in substringsToReplace:
            replaceString = parseAndEvaluateCurlys(innerSubstring, constants, False)
            substring = substring.replace(innerSubstring, replaceString)

        if isFirst:
            return substring
        else:
            return evaluateFinishedCurlys(substring, constants)
    else:
        print("No Curlys")
        if isFirst:
            return substring
        else:
            return evaluateFinishedCurlys(substring, constants)

