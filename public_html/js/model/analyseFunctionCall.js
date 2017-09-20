var vfa_test = vfa_test || {};
vfa_test.extractArgs = extractArgs;
vfa_test.convertType = convertType;

function analyseFunctionCall (argsString){
  'use strinct';
  return extractArgs (argsString);  
}


function extractArgs (argsString) {
  
  'use strinct';

  var ret = [];
  var tmpStr = '';
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
      ret.push(convertType(tmpStr));
      tmpStr = '';
    } else {
      tmpStr += item;
    }
  }

  if (tmpStr !== '') {
      ret.push(convertType(tmpStr));
      tmpStr = '';
  }

  return ret;
}

function convertType (v) {
  
  'use strinct';
  
  try {
    return eval('(' + v + ')');
  } catch(e){}
  
  return v;
}