/**
 * 
 * @param {string} name
 * @param {Array} params
 * @param {Any} returnVal
 * @returns {Object}
 */
function AnalysedFunction (name, params, returnVal) {
        
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
        name: name,
        return: returnVal,
        parameters: params,
        arguments: [],
        paramArgsMap: {},
        loadingType: 0,
        returnValType: null
    };
    
    (function constructor () {
        
        if (!name === undefined) {
            throw Error('invalid Function');
        }
        
        setName(name);
        setReturn(returnVal);
        setParameters(params);
        
        notifyObservers();
        
    })();
    
    /* GET/SET */
    function getName () {
        return fnAttr.name || "";
    }
    function getReturn () {
        return fnAttr.return;
    }
    function getReturnValType () {
        return fnAttr.returnValType;
    }
    function getParameters () {
        return fnAttr.parameters;
    }
    function getArguments () {
        return fnAttr.arguments;
    }
    function getParamArgs () {
        return fnAttr.paramArgsMap;
    }
    function getLodingType (name) {
        
        var LOADINGTYPE_OVER  = 'over';
        var LOADINGTYPE_UNDER = 'under';
        var LOADINGTYPE_NORM  = 'fit';
        
        if (name) {
            return fnAttr.loadingType < 0 ? LOADINGTYPE_UNDER : fnAttr.loadingType > 0 ? LOADINGTYPE_OVER : LOADINGTYPE_NORM;
        }
        return fnAttr.loadingType;
    }
    function hasCustomReturnValue () {
        return fnAttr.return != null && fnAttr.returnValType != 'undefined';
    }
    
    function setName (value) {
        if (fnAttr.name === value) { return; }
        fnAttr.name = value; 
    }
    function setParameters (values) {
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
        fnAttr.returnValType = (function (v) {
            
            if (v) {
                try       { return typeof eval(v); }
                catch (e) { return "not defined Variable"; }
            } else {
                return null;
            }
            
        })(value);
    }
    
    /* Methods */
   
    function findParamArgs () {  
        fnAttr.paramArgsMap = {};
        for (var i = 0; i < fnAttr.parameters.length; i++) {            
            var p = fnAttr.parameters[i];
            var a = fnAttr.arguments[i];
            fnAttr.paramArgsMap[p] = a;
        }        
    }

    function findLoadingType () {
              
        console.log('findLoadingType');
        
        if (fnAttr.arguments.length < fnAttr.parameters.length) {
            fnAttr.loadingType = -1;
        } else
        if (fnAttr.arguments.length > fnAttr.parameters.length) {
            fnAttr.loadingType = 1;
        } else {
            fnAttr.loadingType = 0;
        }
    };
    
    function setArguments (args) {      
        
        if (args === undefined) {
            throw new Error('no array passed');
        }
     
        fnAttr.arguments = args;
        findParamArgs();
        findLoadingType();
    };
    
    return {
        addObserver: addObserver,

        getName: getName,
        getReturn: getReturn,
        getReturnValType: getReturnValType,
        getParameters: getParameters,
        getArguments: getArguments,
        getParamArgs: getParamArgs,
        getLodingType: getLodingType,

        setName: setName,
        setParameters: setParameters,
        setReturn: setReturn,

        hasCustomReturnValue: hasCustomReturnValue,
        setArguments: setArguments
    };
}