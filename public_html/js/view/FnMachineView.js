function FnMachineView (model, aParts, ctrls) {

  'use strinct';

  this.update = update;
  this.show   = show;
  this.hide   = hide;

  var OFFSET_TEXT_RETURN_WITH_VAL = { x: 104, y: 14 };
  var OFFSET_ARGUMENTS            = 50;
  var STEPS_DYNAMIC_WIDTH         = 23;
  var STEPS_DYNAMIC_HEIGHT        = 23;

  var bubbleContainer = document.getElementById('fn-parameter--argBubbles');
  var bodyRect        = document.getElementById('fn-body').getElementsByTagName('rect')[0];
  
  var bodyRectWidth = +bodyRect.getAttribute('width');
  var bodyRectHight = +bodyRect.getAttribute('height');

  var parts = { };

  for (var p in aParts) {
    parts[p] = new FnMachineView_part(document.getElementById(aParts[p]));
  }

  (function () {

    model.addObserver(this);
    showInValidView();

  }).bind(this)();
       
  function showValidView () {

    function displayReturn () {

      if (model.getReturnValue() !== null) {
        parts.returnV.showSpecial();
        parts.returnV.setText(model.getReturnValue(), OFFSET_TEXT_RETURN_WITH_VAL);
      } else {
        parts.returnV.hideSpecial();
        parts.returnV.setText('undefined'); 
      }
    }   
    function resize (offset) {

      parts.nameExt.offsetPosition({x: 0, y: offset.y });
      parts.nameInt.offsetPosition({x: 0, y: offset.y });

      parts.args.offsetPosition({x: offset.x / 1.8, y: 0 });

      parts.returnV.offsetPosition(offset);

      bodyRect.setAttribute('width', bodyRectWidth + offset.x || 0);
      bodyRect.setAttribute('height', bodyRectHight + offset.y || 0);
    }

    function getArgsParams () {

      var paramArgs = model.getParamArgs(true);
      var txt = '';
      for (var param in paramArgs) {
        txt += 'var ' + param + ' = ' + paramArgs[param] + ';<br/>';
      }
      return txt;
    }        
    function getArguments () {

      var newArgs = Object.values(model.getArguments(true));

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
      var paramArgs = model.getArguments(true);
      var txt = '';
      
      txt += '<span style="text-decoration: underline">arguments</span>';
      for (var param in paramArgs) {
        txt += '<span>' + counter++ + ': ' + paramArgs[param] + '</span>';
      }
      txt += '<span>length: ' + paramArgs.length + '</span>';

      return txt;
    }
    function getDynamicHeight () {
      var length = model.getArguments(true).length;
      if (length > 5) {
        return length - 5;
      } else {
        return 1;
      }
    }
    function getDynamicWidth () {
      var paramArgs = model.getParamArgs(true);
      
      if (!Object.keys(paramArgs).length) {
        paramArgs = model.getArguments(true);
      }
      
      var values = [];

      for (var key in paramArgs) {
        values.push(("" + key + paramArgs[key]).length);
      }

      var maxLength = Math.max.apply(null, values);

      if (maxLength > 10) {
        return maxLength - 10;
      } else {
        return 1; 
      }
    }

    parts.nameExt.setText(model.getName_extern() || '(anonymus)');  
    parts.nameInt.setText(model.getName_intern() || '(anonymus)');  
    parts.args   .setText(getArgsText());
    parts.pargs  .setText(getArgsParams());

    ctrls.show();
    
    parts.nameExt.show();
    parts.nameInt.show();
    parts.param  .show();
    parts.pargs  .show();
    parts.returnV.show();
    parts.args   .show();

    bubbleContainer.innerHTML = getArguments(true);
    displayReturn();

    resize({
      x: STEPS_DYNAMIC_WIDTH * getDynamicWidth(),
      y: STEPS_DYNAMIC_HEIGHT * getDynamicHeight()
    });
    
  }
    
  function showInValidView () {

    ctrls.hide();

    parts.nameExt.hide();
    parts.nameInt.hide();
    parts.param  .hide();
    parts.pargs  .hide();
    parts.returnV.hide();
    parts.args   .hide();
  }

  function update () {

    if (model.isValidFunction()) {
      showValidView();
    } else {
      showInValidView();
    }
  }

  function show (name) {
    parts[name].show();
  }
  function hide (name) {
    parts[name].hide();
  }
}