/* global expect, NaN */

describe('valueToString', function () {

  it('should return a String if a string is given', function () {
    var ret1 = stringRepresentation("a");
    var ret2 = stringRepresentation('a');
    expect(ret1).toEqual('"a"');
    expect(ret2).toEqual('"a"');
  });
  
  it('should return a String with a number if a number is given', function () {
    var ret1 = stringRepresentation(1);
    expect(ret1).toEqual("1");
  });
  
  it('should return a String with a boolean if a boolean is given', function () {
    var ret1 = stringRepresentation(true);
    var ret2 = stringRepresentation(false);
    expect(ret1).toEqual("true");
    expect(ret2).toEqual("false");
  });
  
  it('should return a String with an array if a array is given', function () {
    var ret1 = stringRepresentation([1]);
    var ret2 = stringRepresentation([1,2, [3,4]]);
    var ret3 = stringRepresentation(NaN);
    expect(ret1).toEqual("[1]");
    expect(ret2).toEqual("[1,2,[3,4]]");
    expect(ret3).toEqual("NaN");
  });
  
  it('should return a String with a undefined if undefined is given', function () {
    var ret1 = stringRepresentation(undefined);
    expect(ret1).toEqual("undefined");
  });
  
  it('should return a String with a null if null is given', function () {
    var ret1 = stringRepresentation(null);
    expect(ret1).toEqual("null");
  });
  
  it('should return a String with a regex if a regex is given', function () {
    var ret1 = stringRepresentation(/.*/gi);
    expect(ret1).toEqual("/.*/gi");
  });
  
  it('should return a String with a regex if a regex is given', function () {
    var ret1 = stringRepresentation(/.*/gi);
    expect(ret1).toEqual("/.*/gi");
  });
  
  it('should return a String with an object if an object is given', function () {
    var ret1 = stringRepresentation({x:1});
    var ret2 = stringRepresentation({x:[1]});
    var ret3 = stringRepresentation({x:{y:2}});
    var ret4 = stringRepresentation({x:1, y:[2,3,4], z:{a:5}});
    expect(ret1).toEqual("{x:1}");
    expect(ret2).toEqual("{x:[1]}");
    expect(ret3).toEqual("{x:{y:2}}");
    expect(ret4).toEqual("{x:1, y:[2,3,4], z:{a:5}}");
  });
  
});