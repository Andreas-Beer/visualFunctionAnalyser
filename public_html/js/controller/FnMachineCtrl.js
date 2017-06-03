/**
 * @typedef  {object} FnMachine
 * @property {Function} notify()
 */

/**
 * @typedef  {object} Elements
 * @property {FnMachinePart} body 
 * @property {FnMachinePart} arguments 
 * @property {FnMachinePart} parameter 
 * @property {FnMachinePart} return 
 * @property {FnMachinePart} invocation 
 */

/**
 * @class FnMachineCtrl
 * @param {Elements} elements
 * @returns {FnMachine}
 */
function FnMachineCtrl (model, elements) {

    'use strinct';

    var OFFSET_TEXT_RETURN_WITH_VAL = { x: 92, y: 14 };
    var OFFSET_ARGUMENTS = 50;
    
    var lastRoundArgs = [];
    var bubbleContainer = document.getElementById('fn-parameter--argBubbles');
    var bubblesWidths = [];

    // initialize the machine with a error-like state.
    parseError();

    function notify (message, param) {
        switch (message) {
            case 'parseErr': parseError(); break;
            case 'update'  : updateMachine(param); break;
            default        : console.warn('[FnMachineCtrl.notify] unknwon message: "' + message + '"');
        }
    }

    function updateMachine (analyzedFunc) {

        elements.body.setText(analyzedFunc.getName());
        elements.invocation.show();
        elements.parameter.show();

        showReturn(analyzedFunc);
        showArguments(analyzedFunc);
        manageArguments(analyzedFunc);
    }
    
    function showReturn (analyzedFunc) {
        elements.return.show();

        if (analyzedFunc.hasCustomReturnValue()) {
            elements.return.showSpecial();
            elements.return.setText('(' + analyzedFunc.getReturnValType() + ') ' + analyzedFunc.getReturn(), OFFSET_TEXT_RETURN_WITH_VAL);
        } else {
            elements.return.hideSpecial();
            elements.return.setText('undefined');
        }
    }

    function showParamArgsMapping (analyzedFunc) {

        elements.arguments.show();

        var txt = '';
        var counter = 0;
        var paramArgs = analyzedFunc.getParamArgs();
        for (var param in paramArgs) {

            var arg = paramArgs[param];

            txt += '<span>';
            txt += '[' + counter++ + '] ';
            txt += 'var ' + param + ' = ' + arg;
            txt += '</span>';
        }

        elements.arguments.setText(txt);
    }
    
     function showArguments (analyzedFunc) {

        elements.arguments.show();

        var txt = '';
        var counter = 0;
        var paramArgs = analyzedFunc.getArguments();
        
        txt += '<span style="text-decoration: underline">arguments</span>';
        
        for (var param in paramArgs) {
            txt += '<span>' + counter++ + ': ' + paramArgs[param] + '</span>';
        }
        
        txt += '<span>length: ' + paramArgs.length + '</span>';

        elements.arguments.setText(txt);
    }

    function manageArguments (analyzedFunc) {
        
        var paramArgs = analyzedFunc.getArguments();
        var newArgs   = Object.values(paramArgs);
        
        // return if nothing has changed
        if (lastRoundArgs.join() === newArgs.join()) {
            return;
        }
        
        bubbleContainer.innerHTML = '';
        bubblesWidths = [0];

        for (var i = 0; i < newArgs.length; i++) {
            
            var name  = newArgs[i];
            var w     = bubblesWidths.reduce(function (a,b) { return a+b; });
            
            var pos = {
                x:  w,
                y:  20 - (120 * Math.log(i + 1) / Math.log(30))
            };                
            var bubble = new ArgumentsBubble(name, pos, i);
            bubblesWidths.push(bubble.getWidth() + OFFSET_ARGUMENTS);
            bubbleContainer.innerHTML += bubble.getBubble();
        }
        
        lastRoundArgs = newArgs;
    }
    
    
    function parseError () {
        elements.body.setText('');
        elements.invocation.hide();
        elements.parameter.hide();
        elements.return.hide();
    }

    return {
        notify: notify
    };
}