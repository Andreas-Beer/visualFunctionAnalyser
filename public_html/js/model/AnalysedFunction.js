/* global stringRepresentation */

/**
 * @class AnalysedFunction
 * @returns {AnalysedFunction}
 */
function AnalysedFunction () {
        
    'use strict';
    
    /*interface*/
    this.getName_intern    = getName_intern;
    this.getName_extern    = getName_extern;
    this.getReturnValue    = getReturnValue;
    this.getArguments      = getArguments;
    this.getParamArgs      = getParameterArguments;
    this.getLodingType     = getLodingType; 
    this.isValidFunction   = isValidFunction;
    this.updateDeclaration = updateDeclaration;
    this.updateInvocation  = updateInvocation;
    this.addObserver       = addObserver;
    
    /* Obserable */
    var observers = [];
    function addObserver (observer) {
        observers.push(observer);
    }
    function notifyObservers () {
        for (var i = 0; i < observers.length; i++) {
            observers[i].update();
        }
    }
    
  /* Vars */        
  var fnAttr = {
    name_ext     : null,
    name         : null,
    return       : null,
    parameters   : [],
    arguments    : [],
    paramArgsMap : {},
    loadingType  : 0
  };
        
    /* GET / SET */
  function getName_intern () {
    return fnAttr.name;
  }
  function getName_extern () {
    return fnAttr.name_ext;
  }
  function getReturnValue () {
    return fnAttr.return;
  }
  function getArguments (readable) {
    if (!readable) {
      return fnAttr.arguments;
    } else {
      return fnAttr.arguments.map(stringRepresentation);
    }
  }
  function getParameterArguments (readable) {  
    if (!readable) {
      return fnAttr.paramArgsMap;
    } else {
      var ret = {};
      for (var key in fnAttr.paramArgsMap) {
        ret[key] = stringRepresentation(fnAttr.paramArgsMap[key]);
      }
      return ret;
    }
  }
  function getLodingType () {
    return fnAttr.loadingType;
  }

  function isValidFunction () {
    return fnAttr.name !== null;
  }

  function setName (value) {
    fnAttr.name = value;
  }
  function setName_ext (value) {
    fnAttr.name_ext = value;
  }
    function setParameters (values) {
      if (!(values instanceof Array)) {
        throw new Error('Parameters must be an array!, got "' + values + '"');
      }  

      fnAttr.parameters = values;
      updateParamArgsMap();
      updateLoadingType(); 
    }
    function setReturn (value) {
      if (fnAttr.return === value) { return; }
      fnAttr.return = value;
    }
    function setArguments (value) {                
      fnAttr.arguments = value;
      updateParamArgsMap();
      updateLoadingType();
      notifyObservers();
    }
    
    /* Methods */
   
    function defaultValues () {
        setName(null);
        setParameters([]);
        setReturn(null);
        notifyObservers();
    }
    function change (aFnDcl) {
        
//        console.log(aFnDcl);
       
        if (!aFnDcl) {
            defaultValues();
            return;
        }
        
        if (aFnDcl.name_ext) {
            setName_ext(aFnDcl.name_ext);
        } else {
            setName_ext(aFnDcl.name_int);
        }

        setName(aFnDcl.name_int);
        setParameters(aFnDcl.parameters);
        setReturn(aFnDcl.return || null);
      
        notifyObservers();
    }
   
    function updateParamArgsMap () { 
        
        var paramArgsMap = {};
        for (var i = 0; i < fnAttr.parameters.length; i++) {            
            var p = fnAttr.parameters[i];
            var a = fnAttr.arguments[i];
            paramArgsMap[p] = a;
        }
        fnAttr.paramArgsMap = paramArgsMap;
    }

    function updateLoadingType () {
        
        var loadingType = 0;
        
        if (fnAttr.arguments.length < fnAttr.parameters.length) {
            loadingType =  -1;
        } else
        if (fnAttr.arguments.length > fnAttr.parameters.length) {
            loadingType =  1;
        }
        
        fnAttr.loadingType = loadingType;
    };
    
    function updateDeclaration (fnString) { 
        change(analyseFunctionDeclaration(fnString));
    }
    
    function updateInvocation (argsString) {
        setArguments(analyseFunctionCall(argsString));
    }
}