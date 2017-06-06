/* global expect */

describe('AnalysedFunction', function () {
    
    function getMappedArgsCount (args) {
        return Object.keys(args).length;
    }   
    
    var aFunc_without_ret;
    var aFunc_with_ret;
    var aFunc_with_param;
    var aFunc_with_params;
    
    beforeEach(function () {
       aFunc_with_ret    = new AnalysedFunction('', [], 'undefined');
       aFunc_without_ret = new AnalysedFunction('', []);
       aFunc_with_param  = new AnalysedFunction('', ['a'], undefined);
       aFunc_with_params = new AnalysedFunction('', ['a', 'b', 'c'], undefined);
    });
       
});