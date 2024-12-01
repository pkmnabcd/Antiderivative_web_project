from sys import stderr

def evaluateFinishedCurlys(inside, constants):
    if len(inside) == 1:
        # Assume this is a constant
        return str(constants[inside])
    else:
        print("Only one-char constants are currently implemented...", file=stderr)

def findMatchingCurlys(substring):
    openCurlysList = []
    closeCurlysList = []

    currentIndex = 0
    curlyCount = 0
    while currentIndex < len(substring) - 1:
        if substring[currentIndex : currentIndex + 2] == "{;":
            if curlyCount == 0:
                openCurlysList.append(currentIndex)
            curlyCount += 1
            currentIndex += 2
        elif substring[currentIndex : currentIndex + 2] == ";}":
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
        print("Unexpected Input with the input substring: " + substring)
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

        for i in range(len(substringsToReplace)):
            innerData = substringsToReplace[i]
            innerSubstring = innerData["innerSubstring"]
            innerLen = innerData["len"]
            innerPosition = innerData["position"]

            replaceString = parseAndEvaluateCurlys(innerSubstring, constants, False)
            replacementDelta = len(replaceString) - len(innerSubstring)
            for j in range(i+1, len(substringsToReplace)):
                substringsToReplace[j]["position"] += (replacementDelta - 4)

            removeStart = innerPosition
            removeEnd = innerPosition + innerLen - 1
            # Taking out old, putting in replacement
            substring = substring[ : innerPosition] + replaceString + substring[removeEnd + 1 : ]

        if isFirst:
            return substring
        else:
            return evaluateFinishedCurlys(substring, constants)
    else:
        if isFirst:
            return substring
        else:
            return evaluateFinishedCurlys(substring, constants)

def removeCurlys(input):
    output = input
    loopEnd = len(input) - 1
    i = 0
    while i < loopEnd:
        testString = output[i : i+2]
        if testString == "{;" or testString == ";}":
            output = output[0:i] + output[i+2 :]
            loopEnd -= 2
        else:
            i += 1
    return output
