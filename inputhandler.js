export default class InputHandler{
	constructor(visitor){

		document.addEventListener("keydown", event => {
			if (event.keyCode == 37)		// ArrowLeft
				visitor.turnDirection = 1;
			if (event.keyCode == 39)		// ArrowRight
				visitor.turnDirection = -1;
			if (event.keyCode == 38)		// UpArrow
				visitor.walkDirection = -1;
			if (event.keyCode == 40)		// DownArrow
				visitor.walkDirection = 1;
			if (event.keyCode == 86	)			// v
				if (visitor.viewMode == 1){
					visitor.viewMode = 2;
				} else {
					visitor.viewMode = 1;
				}
			if (event.keyCode == 70	){		// f
				visitor.shiftFloor();
			}		
		});
			
		document.addEventListener("keyup", event => {
			if (event.keyCode == 37)		// ArrowLeft
				visitor.turnDirection = 0;
			if (event.keyCode == 39)		// ArrowRight
				visitor.turnDirection = 0;
			if (event.keyCode == 38)		// UpArrow
				visitor.walkDirection = 0;
			if (event.keyCode == 40)		// DownArrow
				visitor.walkDirection = 0;
		});	
	}	
}


// pointer lock API
//https://developer.mozilla.org/en-US/docs/Web/API/Pointer_Lock_API

/*
canvas.requestPointerLock = canvas.requestPointerLock ||
                            canvas.mozRequestPointerLock;

document.exitPointerLock = document.exitPointerLock ||
                           document.mozExitPointerLock;

canvas.onclick = function() {
  canvas.requestPointerLock();
  // skal eventuelt slås fra, hvis musen ikke er fanget

	
	//document.addEventListener("mousemove", function () {visitor.updatePosition(e,camera_FP)}, true);
	//hvis man skal passe et argument sammen med eventet kan det gøres således:
	
	document.addEventListener("mousemove", (e) => {visitor.updatePosition(e,camera_FP)}, true);
};
*/
