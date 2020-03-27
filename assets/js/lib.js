/*touch support*/
document.querySelector("footer").addEventListener('touchstart', handleTouchStart, false);        
document.querySelector("footer").addEventListener('touchmove', handleTouchMove, false);

var xDown = null;                                                        
var yDown = null;

function getTouches(evt) {
  return evt.touches ||             // browser API
         evt.originalEvent.touches; // jQuery
}                                                     

function handleTouchStart(evt) {
    const firstTouch = getTouches(evt)[0];                                      
    xDown = firstTouch.clientX;                                      
    yDown = firstTouch.clientY;                                      
};                                                

function handleTouchMove(evt) {
    if ( ! xDown || ! yDown ) {
        return;
    }

    var xUp = evt.touches[0].clientX;                                    
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
        if ( xDiff > 0 ) {
        	// if () {}
            /* left swipe */ 
        } else {
            /* right swipe */
            /* left swipe */ 
        }                       
    } else {
        if ( yDiff > 0 ) {
        		toggleFooter();
            /* up swipe */ 
        } else { 
        		toggleFooter();
            /* down swipe */
        }                                                                 
    }
    /* reset values */
    xDown = null;
    yDown = null;                                             
};

// toast
function toast(text = "This is Toast!") {
	if (document.querySelector(".toast"))	document.querySelector(".toast").remove()
	document.querySelector("body").insertAdjacentHTML("beforeend", `<div class="toast">${text}</div>`)
	setTimeout(function() {
		if(document.querySelector(".toast")) {
			document.querySelector(".toast").remove()
		}
	}, 3000)
}