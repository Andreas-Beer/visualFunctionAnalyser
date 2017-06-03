function FnFormView (model, controller) {
   
    'use strinct';
   
    var form            = document.getElementById('fn-form');
    var in_declaration  = document.getElementById('declaration');
    var in_invocation   = document.getElementById('invocation');
    var in_call         = document.getElementById('call');
    
    var out_name_int    = document.getElementById('name')     .getElementsByClassName('txt')[0];
    var out_name_ext    = document.getElementById('name_ext') .getElementsByClassName('txt')[0];
    var out_return      = document.getElementById('return')   .getElementsByClassName('txt')[0];
    var out_parameter   = document.getElementById('parameter').getElementsByClassName('txt')[0];
    var out_loading     = document.getElementById('loading')  .getElementsByClassName('txt')[0];   
    var out_callName    = document.getElementById('call-name');
    
    var DEFAULT_VALUE  = '-';
    var DEFAULT_NAME   = '(anonymus)';
    var DEFAULT_RETURN = 'undefined';
    
    (function constructor () {
        
        form.addEventListener('submit', function (evt) {
            evt.preventDefault();
        })

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
            return '( ' + Object.keys(paramArgs).join(', ') + ' )';
        }
        function showLoadingText (loadingType) {            
            switch (loadingType) {
                case 1 : return 'over-loaded';
                case -1: return 'under-loaded';
                default: return 'fit';
            }
        }
        function show (element) {
            element.style.display = 'inline';
        }
        
        out_callName .innerHTML = model.getName_extern() || DEFAULT_NAME;
        out_name_ext .innerHTML = model.getName_extern() || DEFAULT_NAME
        out_name_int .innerHTML = model.getName_intern() || DEFAULT_NAME;
        out_return   .innerHTML = model.getReturnValue() || DEFAULT_RETURN;        
        out_parameter.innerHTML = showParameters(model.getParamArgs()) || '()';
        out_loading  .innerHTML = showLoadingText(model.getLodingType());
        
        in_invocation.removeAttribute('disabled');
    }
    
    function showInValidView () {
                
        out_callName .innerHTML = DEFAULT_VALUE;
        out_name_int .innerHTML = DEFAULT_VALUE;
        out_name_ext .innerHTML = DEFAULT_VALUE;
        out_return   .innerHTML = DEFAULT_VALUE;
        out_parameter.innerHTML = DEFAULT_VALUE;
        out_loading  .innerHTML = DEFAULT_VALUE;
        
        in_invocation.setAttribute('disabled', 'disabled');
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