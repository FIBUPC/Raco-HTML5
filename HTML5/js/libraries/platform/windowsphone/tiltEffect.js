/*----------------------------------------------------*\

    METRO TILES TILT EFFECT
    URL - http://github.com/SalvoGentile/tiltEffect
    LICENSE - New BSD License (BSD)

\*----------------------------------------------------*/

$(function() {      
    $('body').on('mousemove mousedown', '.clickable', function (e) {
        // Cursor position inside the element
        var x=e.pageX-this.offsetLeft;
        var y=e.pageY-this.offsetTop;
        
        var qX=$(this).width()/4;
        var qY=$(this).height()/4;

        if (y<qY && x>qX && x<qX*3) {
            setEffect(this, "top");
        } else if (x>qX*3 && y>qY && y<qY*3) {
            setEffect(this, "right");
        } else if (y>qY*3 && x>qX && x<qX*3) {
            setEffect(this, "bottom");
        } else if (x<qX && y>qY && y<qY*3) {
            setEffect(this, "left");
        } else {
            setEffect(this, "right");
        }
    });

    function setEffect(targetElement, effectDirection) {
        var directions=new Array("center", "top", "right", "bottom", "left");
        
        // Disable all the effect except the right one
        for (i=0; i<directions.length; i++) {
            if (!(directions[i]==effectDirection)) {
                $(targetElement).removeClass(directions[i]);
            }
        }

        $(targetElement).addClass(effectDirection);
    } // setEffect
});