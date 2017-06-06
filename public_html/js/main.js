/**
 * The Main file for the visual Function Analyser
 * 
 * @author Andreas Beer <anderasbeer@gmx.com>
 */

var visualFunctionAnalyser = {};

window.addEventListener('load', function () {
    
    'use strinct';
    
    
    var analysedFunction = new AnalysedFunction("", [], "");

    var fnMachineView  = new FnMachineView(analysedFunction);
    
    var fnFormCtrl = new FnFormCtrl(analysedFunction);
    var fnFormView = new FnFormView(analysedFunction, fnFormCtrl);
    
    fnFormView.init();
    
    visualFunctionAnalyser.machine = fnMachineView;
});