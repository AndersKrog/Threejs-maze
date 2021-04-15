export default class InputHandler{
	constructor(visitor){

		document.addEventListener("keydown", event => {
			if (event.keyCode == 37)
				visitor.turnDirection = 1;
			if (event.keyCode == 39)
				visitor.turnDirection = -1;
			if (event.keyCode == 38)
				visitor.walkDirection = -1;
			if (event.keyCode == 40)
				visitor.walkDirection = 1;
		});
			
		document.addEventListener("keyup", event => {
			if (event.keyCode == 37)
				visitor.turnDirection = 0;
			if (event.keyCode == 39)
				visitor.turnDirection = 0;
			if (event.keyCode == 38)
				visitor.walkDirection = 0;
			if (event.keyCode == 40)
				visitor.walkDirection = 0;
		});	
	}	
}