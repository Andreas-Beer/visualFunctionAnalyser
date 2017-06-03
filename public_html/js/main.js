/**
 * The Main file for the visual Function Analyser
 * 
 * @author Andreas Beer <anderasbeer@gmx.com>
 */

window.addEventListener('load', function () {
    
    var analysedFunction = new AnalysedFunction("", [], "");
    
    var fnMachineCtrl = new FnMachineCtrl(analysedFunction, {
        body      : new FnMachineCtrl_part(document.getElementById('fn-body'      )),
        arguments : new FnMachineCtrl_part(document.getElementById('fn-arguments' )),
        parameter : new FnMachineCtrl_part(document.getElementById('fn-parameter' )),
        return    : new FnMachineCtrl_part(document.getElementById('fn-return'    )),
        invocation: new FnMachineCtrl_part(document.getElementById('fn-invocation'))
    });
    var fnMachineView  = new FnMachineView(analysedFunction, fnMachineCtrl);

    var fnFormCtrl = new FnFormCtrl(analysedFunction, document.getElementById('fn-form'));
    var fnFormView = new FnFormView(analysedFunction, fnFormCtrl);
    
    fnFormCtrl.addObserver(fnMachineCtrl);
});