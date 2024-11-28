from sys import stderr

def evaluateFinishedCurlys(inside, constants):
    if len(inside) == 1:
        # Assume this is a constant
        return str(constants[inside])
    else:
        print("Implement me", file=stderr)

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
        substringsToReplace = {}
        count = 0
        for i in range(curlyCount):
            openCurlyIndex = openCurlysList[i]
            closeCurlyIndex = closeCurlysList[i]
            innerStartIndex = openCurlyIndex + 2

            innerSubstring = substring[innerStartIndex : closeCurlyIndex]
            substringsToReplace[count] = {"innerSubstring": innerSubstring, "len": (len(innerSubstring) + 4), "position": openCurlyIndex}
            count += 1
        print(substringsToReplace)

        for i in range(len(substringsToReplace)):
            innerData = substringsToReplace[i]
            print(innerData)
            innerSubstring = innerData["innerSubstring"]
            innerLen = innerData["len"]
            innerPosition = innerData["position"]

            replaceString = parseAndEvaluateCurlys(innerSubstring, constants, False)
            replacementDelta = len(replaceString) - len(innerSubstring)
            for j in range(i+1, len(substringsToReplace)):
                substringsToReplace[j]["position"] += (replacementDelta - 4)

            removeStart = innerPosition
            removeEnd = innerPosition + innerLen - 1
            print("removeStart:", str(removeStart), "\nremoveEnd:", str(removeEnd))
            # Taking out old, putting in replacement
            substring = substring[ : innerPosition] + replaceString + substring[removeEnd + 1 : ]
            print(substring)

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

