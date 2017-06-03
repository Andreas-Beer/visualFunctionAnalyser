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
    
    describe('constructing', function () {
        it('should parse params to undefined', function () {            
            expect(getMappedArgsCount(aFunc_with_params.getParamArgs())).toBe(3);
            expect(aFunc_with_params.getParamArgs()['a']).toBe(undefined);
        });
    });
   
    describe('hasCustomReturnValue()', function () {
       
        it('should return true if a return value was passed to the constructor', function () {
            expect(aFunc_with_ret.hasCustomReturnValue()).toBe(true);
        });
        it('should return false if no return value was passed', function () {
            expect(aFunc_without_ret.hasCustomReturnValue()).toBe(false);
        });  
    });

    describe('setArguments()', function () {
        
        describe('execptions', function () {
            it('should throw an error if no arguments are passed', function () {
                expect(function () { aFunc_with_param.setArguments(); }).toThrowError('no array passed');
            });
        });
                
        it('should map the params and args', function () {
            aFunc_with_params.setArguments([1,2,3]);
            expect(getMappedArgsCount(aFunc_with_params.getParamArgs())).toBe(3);
        });
        
        it('should not map more args', function () {
            aFunc_with_params.setArguments([1,2,3,4,5]);
            expect(getMappedArgsCount(aFunc_with_params.getParamArgs())).toBe(3);
        });
        
        it('should map underloaded params to undefined', function () {
            aFunc_with_params.setArguments([]);
            expect(getMappedArgsCount(aFunc_with_params.getParamArgs())).toBe(3);
            expect(aFunc_with_params.getParamArgs()['a']).toBe(undefined);
        });
        
        describe('loaded', function () {
            
            it('should be normal loaded if the arguments and parameters are the same size', function () {
                aFunc_with_param.setArguments([1]);
                expect(aFunc_with_param.getLodingType()).toBe(0);
            });

            it('should be overloaded if there are more arguments than parameters', function () {
                aFunc_with_param.setArguments([1,2,3]);
                expect(aFunc_with_param.getLodingType()).toBe(1);
            });

            it('should be underloaded if there are less arguments than parameters', function () {
                aFunc_with_param.setArguments([]);
                expect(aFunc_with_param.getLodingType()).toBe(-1);
            });
        });
        
    });
});