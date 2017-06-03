function FnFormView (model, controller) {
    
    var in_declaration = document.getElementById('declaration');
    var in_invocation  = document.getElementById('invocation');
    var in_call        = document.getElementById('set-call');
    
    var out_name       = document.getElementById('name');
    var out_return     = document.getElementById('return');
    var out_parameter  = document.getElementById('parameter');
    var out_callName   = document.getElementById('call-name');
    var out_loading    = document.getElementById('loading');   
    
    (function constructor () {
        
        in_declaration.addEventListener('keyup', function () {
            controller.analyseDeclaration(this.value);
        });

        in_invocation.addEventListener('keyup', function () {
           controller.analyseInvocation (this.value); 
        });
        
        model.addObserver(this);
        
    })();
    
    
    function update () {   
        
        console.log('[FnFormView] update');
        
        out_callName .innerHTML = model.getName();
        out_name     .innerHTML = model.getName();
        out_return   .innerHTML = model.getReturn();
        out_parameter.innerHTML = model.getParameters().join(', ');
        out_loading  .innerHTML = model.getLodingType(true);
    }  
      
    
    function showInvocationInput () {
        in_call.style.display   = 'block';
    }
    function hideInvocationInput () {
        in_call.style.display = 'none';
    }
}