function analyseFunctionCall (fnString, analysedFunc){
        
    analysedFunc.setArguments(extractArgs(fnString));
    return analysedFunc;
        
    function extractArgs (args) {

        var regex = /\[[^\]]*\]|{[^\}]*}|[^,\s]*/g;
        var argsList = [];
        var m;

        while ((m = regex.exec(args)) !== null) {
            
            if (m[0]) {
                argsList.push(m[0]);
            } else {
                regex.lastIndex++;
            }
        }
        
        return argsList;
    }
    
}