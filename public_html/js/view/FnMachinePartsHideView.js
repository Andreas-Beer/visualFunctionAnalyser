function FnMachinePartsHideView (aParts) {
  
  'use strict';
  
  this.show     = show;
  this.hide     = hide;
  this.setState = setState;
  
  var lables = {
    nameInt: 'Name (Intern)',
    nameExt: 'Name (Extern)',
    args   : 'arguments-Array',
    param  : 'Parameter',
    returnV: 'return-Wert',
    callF  : 'call-Rad',
    pargs  : 'Parameter-Zuweisung'
  };
  
  var checkBoxes = [];
  var form       = document.getElementById('hide-form');
  var fieldset   = form.getElementsByTagName('fieldset')[0];
  
  function show () {
    form.style.display = 'block';
  }
  function hide () {
    form.style.display = 'none';
  }
  
  function setState (state) {
    for (var i = 0; i < checkBoxes.length; i++) { 
      var box = checkBoxes[i].getElementsByTagName('input')[0];
      box.checked = state;
      box.click();
    }
  }
  
  function createHideBtns () {
    
    var fragment = document.createDocumentFragment();
    
    for (var p in aParts) {

      if (!lables[p]) {
        continue;
      }
      
      var box = createHideBtn(lables[p], p);
      checkBoxes.push(box);
      fragment.appendChild(box);
    }
    
    fieldset.appendChild(createHideBtn('all', 'a'));
    fieldset.appendChild(fragment);
    
    show();
  }
  
  function createHideBtn (labelTxt, value) {
    
    var label       = document.createElement('label');
    label.innerText = labelTxt;
    label.setAttribute('for', value);

    var check     = document.createElement('input');
    check.type    = 'checkbox';
    check.value   = value;
    check.id      = value;
    check.checked = true;

    var container = document.createElement('div');

    container.appendChild(check);
    container.appendChild(label);
    
    return container;
  }
  
  createHideBtns();
}