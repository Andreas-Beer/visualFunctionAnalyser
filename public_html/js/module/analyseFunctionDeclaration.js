function analyseFunctionDeclaration (fnString, analysedFunc) {

    var regex = /function\s+(\w*)\s*\(([^)]*)\)\s*{([\w\W]*)}/;
    var match = regex.exec(fnString);

    if (match) {
        
        var name       = extractName  (match[1]);
        var parameters = extractParams(match[2]);
        var returnVal  = extractRetVal(match[3]);
        
        if (analysedFunc) {
            analysedFunc.setName      (name);
            analysedFunc.setReturn    (returnVal);            
            analysedFunc.setParameters(parameters);
            return analysedFunc;
        } else {
            return new AnalysedFunction(name, parameters, returnVal);
        }
        
    } else {
        return null;
    }
    
    function extractName (fnBody) {
        return fnBody || "(anonymous)";
    }

    function extractRetVal (fnBody) {
        var regex = /return\s+([^;]*)\s*;/;
        var m = regex.exec(fnBody);

        if (m) {
            return m[1];
        }
        return 'undefined';
    }

    function extractParams (param) {

        var regex = /\s*([^,]*)/g;
        var argsList = [];
        var m;

        while ((m = regex.exec(param)) !== null) {
            if (m[1]) {
                argsList.push(m[1]);
            } else {
                regex.lastIndex++;
            }
        }
        return argsList;
    }
}