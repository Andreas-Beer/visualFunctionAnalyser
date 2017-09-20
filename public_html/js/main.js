/**
 * The Main file for the visual Function Analyser
 * 
 * @author Andreas Beer <anderasbeer@gmx.com>
 */

window.addEventListener('load', function () {

  'use strinct';
  
  var analysedFunction = new AnalysedFunction("", [], "");

  var parts = {
    nameInt : 'fn-name-int',
    nameExt : 'fn-name-ext',
    args    : 'fn-arguments',
    pargs   : 'fn-paramargs',
    param   : 'fn-parameter',
    returnV : 'fn-return'
  };

  var fnMachinePartsHideView = new FnMachinePartsHideView(parts);
  
  var fnMachineView = new FnMachineView(analysedFunction, parts, fnMachinePartsHideView);
  
  var fnMachinePartsHideCtrl = new FnMachinePartsHideCtrl(fnMachineView, fnMachinePartsHideView);

  var fnFormView = new FnFormView(analysedFunction);
  var fnFormCtrl = new FnFormCtrl(fnFormView, analysedFunction);
  
  fnFormCtrl.init();
});