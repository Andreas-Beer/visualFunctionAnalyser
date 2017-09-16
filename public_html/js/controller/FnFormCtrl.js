/**
 * @typedef  {object} FnForm
 * @property {Function} analyseDeclaration() 
 * @property {Function} analyseInvocation() 
 */

/**
 * @class FnFormCtrl
 * @param {type} model
 * @returns {FnForm}
 */
function FnFormCtrl (view, model) {

    'use strict';
    
    this.init = init;
    
    var form            = document.getElementById('fn-form');
    var in_declaration  = document.getElementById('declaration');
    var in_invocation   = document.getElementById('invocation');
    var in_call         = document.getElementById('call');
    
    function analyseDeclaration (fnString) {
        model.updateDeclaration(fnString);
    }
    
    function analyseInvocation (fnString) {
        model.updateInvocation(fnString);
    }
    
    function init () {
        analyseDeclaration(in_declaration.value);
        analyseInvocation(in_invocation.value);
    }
    
    (function () {
        
        form.addEventListener('submit', function (evt) {
            evt.preventDefault();
        })

        in_declaration.addEventListener('keyup', function () {
            analyseDeclaration(this.value);
        });

        in_invocation.addEventListener('keyup', function () {
           analyseInvocation (this.value); 
        });
           
        model.addObserver(view); 
        
    }).bind(this)();
    
}