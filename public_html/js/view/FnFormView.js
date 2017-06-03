function FnFormView (model, controller) {
   
    var in_declaration = document.getElementById('declaration');
    var in_invocation  = document.getElementById('invocation');
    var in_call        = document.getElementById('set-call');
    
    var out_name       = document.getElementById('name');
    var out_return     = document.getElementById('return');
    var out_parameter  = document.getElementById('parameter');
    var out_callName   = document.getElementById('call-name');
    var out_loading    = document.getElementById('loading');  
    
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
    }
        
    function showValidView () {
        out_callName .innerHTML = model.getName() || '(anonymus)';
        out_name     .innerHTML = model.getName() || '(anonymus)';
        out_return   .innerHTML = model.getReturnValue() || 'undefined';
        out_parameter.innerHTML = showParameters(model.getParamArgs());
        out_loading  .innerHTML = showLoadingText(model.getLodingType());
        showInvocationInput();
    }
    
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
    
    function showInValidView () {
        out_callName .innerHTML = DEFAULT_VALUE;
        out_name     .innerHTML = DEFAULT_VALUE;
        out_return   .innerHTML = DEFAULT_VALUE;
        out_parameter.innerHTML = DEFAULT_VALUE;
        hideInvocationInput();
    }
      
    function showInvocationInput () {
        in_call.style.display = 'block';
    }
    function hideInvocationInput () {
        in_call.style.display = 'none';
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