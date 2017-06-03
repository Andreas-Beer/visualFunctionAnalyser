function ArgumentsBubble (name, pos, index) {
    
    'use strict';
    
    var WIDTH_BASE = 14.5;
    var bubble;
    var width = 0;
    
    function getBubble () {
        return bubble;
    }
    function getWidth () {
       return width; 
    }
        
    (function constructor () {
        pos = pos || {};
        pos.x = pos.x || 0;
        pos.y = pos.y || 0;
        
        bubble = createBubbleSVG(name, pos);
    })();
    
    
    function createBubbleSVG (name, pos) {

        width =  10 + (WIDTH_BASE * String(name).length);
        
        var bubble = '';        
        bubble += '<g class="argument-bubble" transform="translate(' + pos.x + ', ' + pos.y + ')">';    
        bubble += '<rect class="main special" width="' + width + '" height="40"></rect>';
        bubble += '<text x="-40" y="12" class="text index">[' + index + ']</text>'; 
        bubble += '<text x="5" y="28" class="text value">' + name + '</text>'; 
        bubble += '</g>';    
        
        return bubble;
    }
    
    return {
        getBubble: getBubble,
        getWidth: getWidth
    };
}