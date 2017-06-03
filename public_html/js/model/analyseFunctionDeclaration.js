function analyseFunctionDeclaration (fnString) {
    
    'use strinct';

    var regex = /^(?:(?:var\s+(\w+)\s*=\s*function)|(?:function\s+))?\s*(\w*)\s*\(([^)]*)\)\s*{([\w\W]*)}/;
    var match = regex.exec(fnString);

    if (match) {
        return {
            name_ext   : match[1],
            name_int   : match[2],
            parameters : extractParams(match[3]),
            return     : extractRetVal(match[4])
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