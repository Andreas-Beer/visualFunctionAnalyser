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
function FnMachineCtrl_part (element) {
    
    'use strinct';
    
    var hightlightColor = '#c22';
    var mainColor;

    var parts = {
        main: null,
        text: null,
        special: null
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
    
    return {
        hide: hide,
        show: show,
        
        showSpecial: showSpecial,
        hideSpecial: hideSpecial,
        
        setText: setText
    };
    
}
