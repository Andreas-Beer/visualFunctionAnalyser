/**
 * @class AnalysedFunction
 * @returns {AnalysedFunction}
 */
function AnalysedFunction () {
        
    'use strict';
    
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
    
    /* Class */        
    var fnAttr = {
        name            : null,
        return          : null,
        parameters      : null,
        arguments       : [],
        argumentsDirty  : false,
        paramArgsMap    : {},
        loadingType     : 0
    };
        
    /* GET / SET */
    function getName () {
        return fnAttr.name;
    }
    function getReturnValue () {
        return fnAttr.return;
    }
    function getArguments () {
        return fnAttr.arguments;
    }
    function getParameterArguments () {
        return fnAttr.paramArgsMap;
    }
    function getLodingType () {        
        return fnAttr.loadingType;
    }
    
    function isValidFunction () {
        return fnAttr.name !== null;
    }
    function isArgumetnsDirty () {
        return fnAttr.argumentsDirty;
    }
    
    function setName (value) {
        if (fnAttr.name === value) { return; }
        fnAttr.name = value;
    }
    function setParam (values) {
        if (!(values instanceof Array)) {
            throw new Error('Parameters must be an array!, got "' + values + '"');
        }        
        fnAttr.parameters = values;
        findParamArgs();
        findLoadingType(); 
    }
    function setReturn (value) {
        if (fnAttr.return === value) { return; }
        fnAttr.return = value;
    }
    function setArguments (value) {
        
        if (fnAttr.arguments.join() === value.join()) {
            fnAttr.argumentsDirty = false;
            return;
        }
        
        fnAttr.argumentsDirty = true;
        fnAttr.arguments      = value;
        fnAttr.paramArgsMap   = findParamArgs();
        fnAttr.loadingType    = findLoadingType();
        notifyObservers();
    }
    
    /* Methods */
   
    function defaultValues () {
        setName(null);
        setParam([]);
        setReturn(null);
        notifyObservers();
    }
    function change (aFnDcl) {
        
        if (!aFnDcl) {
            defaultValues();
            return;
        }
        
        setName(aFnDcl.name);
        setParam(aFnDcl.parameters);
        setReturn(aFnDcl.return);
        notifyObservers();
    }
   
    function findParamArgs () {  
        var paramArgsMap = {};
        for (var i = 0; i < fnAttr.parameters.length; i++) {            
            var p = fnAttr.parameters[i];
            var a = fnAttr.arguments[i];
            paramArgsMap[p] = a;
        }
        return paramArgsMap
    }

    function findLoadingType () {
                      
        if (fnAttr.arguments.length < fnAttr.parameters.length) {
            return  -1;
        } else
        if (fnAttr.arguments.length > fnAttr.parameters.length) {
            return  1;
        } else {
            return  0;
        }
    };
    
    function updateDeclaration (fnString) { 
        change(analyseFunctionDeclaration(fnString));
    }
    
    function updateInvocation (argsString) {
        setArguments(analyseFunctionCall(argsString));
    }
    
    /*interface*/
    
    this.getName          = getName;
    this.getReturnValue   = getReturnValue;
    this.getArguments     = getArguments;
    this.getParamArgs     = getParameterArguments;
    this.getLodingType    = getLodingType; 
    this.isValidFunction  = isValidFunction;
    this.isArgumetnsDirty = isArgumetnsDirty;
           
    this.updateDeclaration = updateDeclaration;
    this.updateInvocation  = updateInvocation;
    
    this.addObserver = addObserver;
}