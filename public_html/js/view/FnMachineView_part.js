/**
 @typedef  {Object} FnMachinePart
 @property {Function} hide()
 @property {Function} show()
 @property {Function} setText()
 */

/**
 * @class FnMachinePartCtrl
 * @param   {htmlElement} element
 * @returns {object} FnMachinePart
 */
function FnMachineView_part (element) {
    
    'use strinct';
    
    var mainColor;

    var parts = {
        main: null,
        text: null,
        special: null
    };
    
    var position = {
        x: 0,
        y: 0
    };
    
    (function constructor () {
                
        if (!element) {
            throw new Error();
        }
        
        parts.text    = element.getElementsByTagName('text')[0] || element.getElementsByTagName('p')[0];
        parts.main    = element.getElementsByClassName('main');
        parts.special = element.getElementsByClassName('special')[0];
                        
        if (parts.main.length > 0) {
            mainColor = parts.main[0].style.color;
        }
        
        position = extractPosition(element.getAttribute('transform'));
        
//        console.log(element.getAttribute('transform'), position);
        
    })();
    
    function hide () {
        element.style.display = 'none';        
    }
    function show () {
        element.style.display = 'block';        
    }
    
    function showSpecial () {
        if (parts.special) {
            parts.special.style.display = 'block'; 
        }
    }
    function hideSpecial () {
        if (parts.special) {
            parts.special.style.display = 'none'; 
        }
    }
    
    function setText (text, offset) {
        
        if (parts.text) {
            
            offset = offset || {};
            offset.x = offset.x !== undefined ? offset.x : 0;
            offset.y = offset.y !== undefined ? offset.y : 0;
        
            parts.text.innerHTML = text;
            parts.text.setAttribute('x', offset.x);
            parts.text.setAttribute('y', offset.y);
        }
    }
    
    function offsetPosition (offset) {
        
        offset = offset || {};
        offset.x = offset.x || 0;
        offset.y = offset.y || 0;
        
        var newX = +position.x + +offset.x
        var newY = +position.y + +offset.y
        var translate = 'translate(' + newX + ', ' + newY + ')';
        
//        console.log(element, translate);
    
        element.setAttribute('transform', translate);
    }
    
    function extractPosition (translate) {
        var regex = /\((-?\d*)\s*,\s*(-?\d*)\)/;
        var res = regex.exec(translate);
        
//        console.log(res);
        
        return res != null ? { x: res[1], y: res[2] } : { x: 0, y: 0 };
    }
    
    /*Interface*/
    this.show = show;
    this.hide = hide;
    this.showSpecial = showSpecial;
    this.hideSpecial = hideSpecial;
    this.setText = setText;
    this.offsetPosition = offsetPosition;
    
}
