function analyseFunctionCall (argsString){

    'use strinct';

    return extractArgs (argsString);
    
    function extractArgs (argsString) {
        
        var ret = [];
        var tpmStr = '';
        var layerDepth = 0;

        for (var i = 0; i < argsString.length; i++) {

            var item = argsString[i];

            switch (item) {
                case ' ': continue;
                case '[':
                case '{': layerDepth++; break;
                case ']':
                case '}': layerDepth--; break;
            }
            
            if (item === ',' && layerDepth === 0) {
                ret.push(tpmStr);
                tpmStr = '';
            } else {
                tpmStr += item;
            }
        }
        
        // if there is some string stored, add it
        if (tpmStr !== '') {
            ret.push(tpmStr);
            tpmStr = '';
        }
        
        return ret;
    }
}