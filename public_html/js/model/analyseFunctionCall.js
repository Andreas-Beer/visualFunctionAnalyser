function analyseFunctionCall (argsString){

    'use strinct';

    return extractArgs (argsString);
  
    function extractArgs (argsString) {

        var regex = /\[[^\]]*\]|{[^\}]*}|[^,\s]*/g;
        var argsList = [];
        var m;

        while ((m = regex.exec(argsString)) !== null) {
            
            if (m[0]) {
                argsList.push(m[0]);
            } else {
                regex.lastIndex++;
            }
        }
        
        return argsList;
    }
}