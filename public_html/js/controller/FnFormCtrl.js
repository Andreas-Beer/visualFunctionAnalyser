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
function FnFormCtrl (model) {

    'use strict';
    
    function analyseDeclaration (fnString) {
        model.updateDeclaration(fnString);
    }
    
    function analyseInvocation (fnString) {
        model.updateInvocation(fnString);
    }
    
    this.analyseDeclaration = analyseDeclaration;
    this.analyseInvocation  = analyseInvocation;
}