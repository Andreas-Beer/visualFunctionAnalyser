function stringRepresentation (val) {
        
  var type = typeof val;

  if (type === 'string') {
    return '"' + val + '"';
  }
  if (type === 'undefined') {
    return 'undefined';
  }
  if (type === 'object') {
    
    if (!val) {
      return 'null';
    }
  
    var cnst = val.constructor;

    if (cnst === Array) {
      return JSON.stringify(val);
    }
    
    if (cnst === Object) {
      
      var counter = 0;
      
      var str = "";
      str += "{";
      
      for (var key in val) {
        if (val.hasOwnProperty(key)) {
          
          if (counter) {
            str += ", ";
          }
          
          str += key;
          str += ":";
          str += stringRepresentation(val[key]);     
          
          counter++;
        }
      }
      
      str += "}";
      return str;
    }
    
  }
  
  return val.toString();
}