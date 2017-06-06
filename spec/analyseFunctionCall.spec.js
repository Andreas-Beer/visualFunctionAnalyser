/* global expect */


//[1, 2],[3, 4], [5,[6],[7,8],9], 5, 6, [7], {bla: 23, t: [2,3,4]}

describe('analyseFunctionCall', function () {
    
    describe('array(nested)', function () {
        it('could handle the item in an array, if just a item was passed.', function () {
            var ret = analyseFunctionCall("0");
            expect(ret).toEqual(["0"]);
        });
        it('could handle two items.', function () {
            var ret = analyseFunctionCall("1102, 23, 3");
            expect(ret).toEqual(["1102", "23", "3"]);
        });
        it('could handle two items.', function () {
            var ret = analyseFunctionCall("[11,2]");
            expect(ret).toEqual(["[11,2]"]);
        });
        it('could handle two items', function () {
            var ret = analyseFunctionCall("[1,2], [3,4]");
            expect(ret).toEqual(["[1,2]","[3,4]"]);
        });
        it('could handle thee items', function () {
            var ret = analyseFunctionCall("[1,2], [3,4], [5,6]");
            expect(ret).toEqual(["[1,2]","[3,4]", "[5,6]"]);
        });
        it('could handle a nested array', function () {
            var ret = analyseFunctionCall("[1,2,[3,4]]");
            expect(ret).toEqual(["[1,2,[3,4]]"]);
        });
        it('could handle two nested arrays', function () {
            var ret = analyseFunctionCall("[1,2,[3,4]], [5,6,[7,8]]");
            expect(ret).toEqual(["[1,2,[3,4]]", "[5,6,[7,8]]"]);
        });
        it('could handle two multi nested arrays', function () {
            var ret = analyseFunctionCall("[1,2,[3,[4]]], [5,6,[7,[8,9],10]]");
            expect(ret).toEqual(["[1,2,[3,[4]]]", "[5,6,[7,[8,9],10]]"]);
        });
        it('could handle two multi nested arrays', function () {
            var ret = analyseFunctionCall("[1, 2],[3, 4], [5,[6],[7,8],9], 5, 6, [7],");
            expect(ret).toEqual(["[1,2]", "[3,4]","[5,[6],[7,8],9]", "5", "6", "[7]"]);
        });
    });
    
    describe('object', function () {
        it('could handle an object with one parameter', function () {
            var ret = analyseFunctionCall("{a: 123}");
            expect(ret).toEqual(["{a:123}"]);
        });
        it('could handle an object with two parameters', function () {
            var ret = analyseFunctionCall("{a: 123, b:456}");
            expect(ret).toEqual(["{a:123,b:456}"]);
        });
        it('could handle two objects with two parameters', function () {
            var ret = analyseFunctionCall("{a: 123, b:456}, {a: 123, b:456}");
            expect(ret).toEqual(["{a:123,b:456}", "{a:123,b:456}"]);
        });
        it('could handle database structure', function () {
            var ret = analyseFunctionCall("[{ab: 123, cd:456}, {ab: 123, cd:456}, {ab: 123, cd:456}]");
            expect(ret).toEqual(["[{ab:123,cd:456},{ab:123,cd:456},{ab:123,cd:456}]"]);
        });
    });
});