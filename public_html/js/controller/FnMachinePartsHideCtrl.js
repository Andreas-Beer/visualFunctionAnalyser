function FnMachinePartsHideCtrl (view, ctrlView) {

  'use strict';

  var boxes = document.getElementById('hide-form').getElementsByTagName('input');
  
  for (var i = 0; i < boxes.length; i++) {
    boxes[i].addEventListener('click', onCheckboxChange);
  }
  
  function onCheckboxChange (evt) {
    
     var target = evt.target;
    
    if (target.type !== 'checkbox') { return; }
    
    var show = target.checked;
    var part = target.value;
    
    if (part == 'a') {
      ctrlView.setState(!show);
      return;
    }
    
    if (show) {
      view.show(part);
    } else {
      view.hide(part);
    }
  }

}