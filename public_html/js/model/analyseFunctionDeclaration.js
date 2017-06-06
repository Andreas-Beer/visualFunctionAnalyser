function analyseFunctionDeclaration (fnString) {function constructor () {};
    
    'use strinct';

    var regex_fn = /^(?:(?:var\s+(\w+)\s*=\s*\(?\s*function)|(?:\(?function\s+))?\s*(\w*)\s*\(([^)]*)\)\s*{([\w\W]*)}\s*\)?\s*\(?[^\)]*\)?\s*\)?;?$/;
    var regex_iife  = /\(\s*function\s+[\w\W]*\)\s*{[^}]*}\s*(?:(?:\)\s*\([^\)]*\)\s*;?\s*$)|(?:\([^\)]*\)\s*\)\s*;?$))/;
    var match = regex_fn.exec(fnString);

    if (match) {
        
        // if it is a iife, the function can't be call from the outside.
        if (regex_iife.exec(fnString)) {
            match[1] = '(anonymus)';
        }
        
        // if it is NOT an iife an it has no internal name, the internal name is the external name.
        else {
            match[2] = match[2] || match[1];
        }
        
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