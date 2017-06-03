/**
 * @typedef  {object} FnForm
 * @property {Function} addObserver() 
 */

/**
 * @class FnFormCtrl
 * @param {type} element
 * @returns {FnForm}
 */
function FnFormCtrl (model) {

    'use strict';
    
    /* IObserable */
    var observers = [];
    function addObserver (observer) {
        observers.push(observer);
    }
    function notifyObservers (message, param) {
        for (var i = 0; i < observers.length; i++) {
            observers[i].notify(message, param);
        }
    }
    
    /* CLASS */
    
    var in_declaration = document.getElementById('declaration');
    var in_invocation  = document.getElementById('invocation');
    var in_call        = document.getElementById('set-call');
    
    var out_name       = document.getElementById('name');
    var out_return     = document.getElementById('return');
    var out_parameter  = document.getElementById('parameter');
    var out_callName   = document.getElementById('call-name');
    var out_loading    = document.getElementById('loading');     
                    
    var defaultOutput = {
        getName      : function () { return '?'; },
        getReturn    : function () { return '?'; },
        getParameters: function () { return ['?']; },
        getLodingType: function () { return ""; }
    };
    
    var currAnalyzedFunc = null;
    
    function analyseDeclaration (value) {
        
        currAnalyzedFunc = analyseFunctionDeclaration(value, currAnalyzedFunc);
        
        if (currAnalyzedFunc) {
            fillOutputs(currAnalyzedFunc);
            showInvocationInput(currAnalyzedFunc);
            notifyObservers('update', currAnalyzedFunc);
        } else {
            fillOutputs(defaultOutput);
            hideInvocationInput();
            notifyObservers('parseErr');
        }
        
    }
    
    function analyseInvocation (value) {
        currAnalyzedFunc = analyseFunctionCall(value, currAnalyzedFunc);   
        notifyObservers('update', currAnalyzedFunc);
        out_loading.innerHTML = currAnalyzedFunc.getLodingType(true);   
    }
    
    function fillOutputs (aFn) {      
        out_name     .innerHTML = aFn.getName();
        out_return   .innerHTML = aFn.getReturn();
        out_parameter.innerHTML = aFn.getParameters().join(', ');
        out_loading  .innerHTML = aFn.getLodingType(true);
    }   
    function showInvocationInput (aFn) {
        in_call.style.display   = 'block';
        out_callName.innerHTML = aFn.getName();
    }
    function hideInvocationInput () {
        in_call.style.display = 'none';
    }
            
    return {
        addObserver: addObserver,
        
        
        analyseDeclaration: analyseDeclaration,
        analyseInvocation: analyseInvocation
    };
}