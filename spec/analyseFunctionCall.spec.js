/* global expect, vfa_test */

describe('The Test Bypass', function () {
  
  it('vfa_test', function () {
    expect(vfa_test).toBeDefined();
  });
  
  describe('analyseFunctionCall', function () {
    it('vfa_test.extractArgs', function () {
      expect(vfa_test.extractArgs).toBeDefined();
    });
    it('vfa_test.convertType', function () {
      expect(vfa_test.convertType).toBeDefined();
    });
  });
  
});

//[1, 2],[3, 4], [5,[6],[7,8],9], 5, 6, [7], {bla: 23, t: [2,3,4]}

describe('vfa_test.extractArgs', function () {
    
    describe('array(nested)', function () {
        it('could handle the item in an array, if just a item was passed.', function () {
            var ret = vfa_test.extractArgs("0");
            expect(ret).toEqual([0]);
        });
        it('could handle two items.', function () {
            var ret = vfa_test.extractArgs("1102, 23, 3");
            expect(ret).toEqual([1102, 23, 3]);
        });
        it('could handle two items.', function () {
            var ret = vfa_test.extractArgs("[11,2]");
            expect(ret).toEqual([[11,2]]);
        });
        it('could handle two items', function () {
            var ret = vfa_test.extractArgs("[1,2], [3,4]");
            expect(ret).toEqual([[1,2],[3,4]]);
        });
        it('could handle thee items', function () {
            var ret = vfa_test.extractArgs("[1,2], [3,4], [5,6]");
            expect(ret).toEqual([[1,2],[3,4], [5,6]]);
        });
        it('could handle a nested array', function () {
            var ret = vfa_test.extractArgs("[1,2,[3,4]]");
            expect(ret).toEqual([[1,2,[3,4]]]);
        });
        it('could handle two nested arrays', function () {
            var ret = vfa_test.extractArgs("[1,2,[3,4]], [5,6,[7,8]]");
            expect(ret).toEqual([[1,2,[3,4]], [5,6,[7,8]]]);
        });
        it('could handle two multi nested arrays', function () {
            var ret = vfa_test.extractArgs("[1,2,[3,[4]]], [5,6,[7,[8,9],10]]");
            expect(ret).toEqual([[1,2,[3,[4]]], [5,6,[7,[8,9],10]]]);
        });
        it('could handle two multi nested arrays', function () {
            var ret = vfa_test.extractArgs("[1, 2],[3, 4], [5,[6],[7,8],9], 5, 6, [7],");
            expect(ret).toEqual([[1,2], [3,4],[5,[6],[7,8],9], 5, 6, [7]]);
        });
    });
    
    describe('object', function () {
        it('could handle an object with one parameter', function () {
            var ret = vfa_test.extractArgs("{a: 123}");
            expect(ret).toEqual([{a:123}]);
        });
        it('could handle an object with two parameters', function () {
            var ret = vfa_test.extractArgs("{a: 123, b:456}");
            expect(ret).toEqual([{a:123,b:456}]);
        });
        it('could handle two objects with two parameters', function () {
            var ret = vfa_test.extractArgs("{a: 123, b:456}, {a: 123, b:456}");
            expect(ret).toEqual([{a:123,b:456}, {a:123,b:456}]);
        });
        it('could handle database structure', function () {
            var ret = vfa_test.extractArgs("[{ab: 123, cd:456}, {ab: 123, cd:456}, {ab: 123, cd:456}]");
            expect(ret).toEqual([[{ab:123,cd:456},{ab:123,cd:456},{ab:123,cd:456}]]);
        });
    });
    
    describe('it should return the correct types', function () {
      
      it('return a string', function () {
        var ret = vfa_test.convertType("'A'");
        expect(typeof ret).toEqual("string");
      });
    
      it('return a number', function () {
        var ret = vfa_test.convertType("1");
        expect(ret).toEqual(1);
      });
      
      it('return an array', function () {
        var ret1 = vfa_test.convertType("[1,2,3]");
        var ret2 = vfa_test.convertType("[1,2,[3,4]]");
        expect(ret1).toEqual([1,2,3]);
        expect(ret2).toEqual([1,2,[3,4]]);
      });
      
      it('return a boolean', function () {
        var ret1 = vfa_test.convertType("true");
        var ret2 = vfa_test.convertType("false");
        expect(ret1).toEqual(true);
        expect(ret2).toEqual(false);
      });
      
      it('return an object', function () {
        var ret1 = vfa_test.convertType('{"x":"1"}');
        var ret2 = vfa_test.convertType('{"x":1}');
        var ret3 = vfa_test.convertType('{x:1}');
        expect(ret1).toEqual({x:"1"});
        expect(ret2).toEqual({x:1});
        expect(ret3).toEqual({x:1});
      });
    
    });
});