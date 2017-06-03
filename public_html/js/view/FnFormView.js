function FnFormView (model, controller) {
   
    'use strinct';
   
    var in_declaration  = document.getElementById('declaration');
    var in_invocation   = document.getElementById('invocation');
    var in_call         = document.getElementById('call');
    
    var out_name        = document.getElementById('name')     .getElementsByClassName('txt')[0];
    var out_return      = document.getElementById('return')   .getElementsByClassName('txt')[0];
    var out_parameter   = document.getElementById('parameter').getElementsByClassName('txt')[0];
    var out_loading     = document.getElementById('loading')  .getElementsByClassName('txt')[0];   
    var out_callName    = document.getElementById('call-name');
    
    var DEFAULT_VALUE  = '-';
    
    (function constructor () {
        
        in_declaration.addEventListener('keyup', function () {
            controller.analyseDeclaration(this.value);
        });

        in_invocation.addEventListener('keyup', function () {
           controller.analyseInvocation (this.value); 
        });
        
        model.addObserver(this); 
        
    }).bind(this)();
    
    function init () {
        controller.analyseDeclaration(in_declaration.value);
        controller.analyseInvocation(in_invocation.value);
    }
        
    function showValidView () {
        
        function showParameters (paramArgs) {
            return Object.keys(paramArgs).join(', ');
        }
        function showLoadingText (loadingType) {            
            switch (loadingType) {
                case 1 : return 'over-loaded';
                case -1: return 'under-loaded';
                default: return 'fit-loaded';
            }
        }
        function show (element) {
            element.style.display = 'inline';
        }
        
        out_callName .innerHTML = model.getName() || '(anonymus)';
        out_name     .innerHTML = model.getName() || '(anonymus)';
        out_return   .innerHTML = model.getReturnValue() || 'undefined';
        out_parameter.innerHTML = showParameters(model.getParamArgs());
        out_loading  .innerHTML = showLoadingText(model.getLodingType());
        
        show(in_call);
        show(out_loading);
    }
    
    function showInValidView () {
        
        function hide (element) {
            element.style.display = 'none';
        }
        
        out_callName .innerHTML = DEFAULT_VALUE;
        out_name     .innerHTML = DEFAULT_VALUE;
        out_return   .innerHTML = DEFAULT_VALUE;
        out_parameter.innerHTML = DEFAULT_VALUE;
        
        hide(in_call);
        hide(out_loading);
    }
      
    function update () {   
        
        if (model.isValidFunction()) {
            showValidView();
        } else {
            showInValidView();
        }
    }
    
    this.update = update;
    this.init = init;
}