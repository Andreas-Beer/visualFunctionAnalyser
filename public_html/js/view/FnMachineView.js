function FnMachineView (model, controller) {
    
    'use strinct';
    
    var OFFSET_TEXT_RETURN_WITH_VAL = { x: 104, y: 14 };
    var OFFSET_ARGUMENTS = 50;
    
    var bubbleContainer = document.getElementById('fn-parameter--argBubbles');
    
    var parts = {
        nameInt: new FnMachineView_part(document.getElementById('fn-name-int'  )),
        nameExt: new FnMachineView_part(document.getElementById('fn-name-ext'  )),
        args   : new FnMachineView_part(document.getElementById('fn-arguments' )),
        pargs  : new FnMachineView_part(document.getElementById('fn-paramargs' )),
        param  : new FnMachineView_part(document.getElementById('fn-parameter' )),
        return : new FnMachineView_part(document.getElementById('fn-return'    )),
        call   : new FnMachineView_part(document.getElementById('fn-invocation'))
    }; 
    
    (function constructor () {
                
        model.addObserver(this); 
        showInValidView();
        
    }).bind(this)();
    
    function showValidView () {
        
        function displayReturn () {
            
            if (model.getReturnValue() !== null) {
                parts.return.showSpecial();
                parts.return.setText(model.getReturnValue(), OFFSET_TEXT_RETURN_WITH_VAL);
            } else {
                parts.return.hideSpecial();
                parts.return.setText('undefined'); 
            }
        }        
        
        function getArgsParams () {
            
            var paramArgs = model.getParamArgs();
            var txt = '';
            for (var param in paramArgs) {
                txt += 'var ' + param + ' = ' + paramArgs[param] + '<br/>';
            }
            return txt;
        }        
        function getArguments () {
                                    
            var newArgs = Object.values(model.getArguments());

            bubblesTxt = '';
            bubblesWidths = [0];

            for (var i = 0; i < newArgs.length; i++) {

                var name = newArgs[i];
                var w = bubblesWidths.reduce(function (a, b) {
                    return a + b;
                });

                var pos = {
                    x: w,
                    y: 20 - (120 * Math.log(i + 1) / Math.log(30))
                };
                var bubble = new ArgumentsBubble(name, pos, i);
                bubblesWidths.push(bubble.getWidth() + OFFSET_ARGUMENTS);
                bubblesTxt += bubble.getBubble();
            }
            
            return bubblesTxt;
        }       
        function getArgsText () {

            var counter = 0;
            var paramArgs = model.getArguments();
            var txt = '';

            txt += '<span style="text-decoration: underline">arguments</span>';
            for (var param in paramArgs) {
                txt += '<span>' + counter++ + ': ' + paramArgs[param] + '</span>';
            }
            txt += '<span>length: ' + paramArgs.length + '</span>';

            return txt;
        }
        
        parts.nameExt.setText(model.getName_extern() || '(anonymus)');  
        parts.nameInt.setText(model.getName_intern() || '(anonymus)');  
        parts.args   .setText(getArgsText());
        parts.pargs  .setText(getArgsParams());
                
        parts.nameExt.show();
        parts.nameInt.show();
        parts.call   .show();
        parts.param  .show();
        parts.pargs  .show();
        parts.return .show();
        parts.args   .show();

        bubbleContainer.innerHTML = getArguments();
        displayReturn();
    }
    
    function showInValidView () {
                
        parts.nameExt.hide();
        parts.nameInt.hide();
        parts.call   .hide();
        parts.param  .hide();
        parts.pargs  .hide();
        parts.return .hide();
        parts.args   .hide();
    }
      
    function update () {   
        
        if (model.isValidFunction()) {
            showValidView();
        } else {
            showInValidView();
        }
    }
    
    this.update = update;

}