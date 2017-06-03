function analyseFunctionDeclaration (fnString) {
    
    'use strinct';

    var regex = /function\s+(\w*)\s*\(([^)]*)\)\s*{([\w\W]*)}/;
    var match = regex.exec(fnString);

    if (match) {
        return {
            name       : match[1],
            parameters : extractParams(match[2]),
            return     : extractRetVal(match[3])
        };
    } else {
        return null;
    }
    
    function extractRetVal (fnBody) {
        var regex = /return\s+([^;]*)\s*/;
        var m = regex.exec(fnBody);

        if (m) {
            return m[1];
        } else {
            return null;
        }
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