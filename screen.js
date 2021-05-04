// camera, renderer
export default class Screen{
	constructor(level){
	let mapScale = 75;
	this.camera_FP = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);
	this.camera_Top = new THREE.OrthographicCamera(window.innerWidth/ -mapScale,window.innerWidth/ mapScale, window.innerHeight/mapScale,window.innerHeight/-mapScale, 1,1000);
	this.renderer = new THREE.WebGLRenderer({ canvas: canvasGL, antialias: true});
	this.renderer2 = new THREE.WebGLRenderer({ alpha: true, canvas: canvasGL2, antialias: true});

	this.camera_Top.position.y = 500;
	this.camera_Top.position.z = level.TILESIZE * level.map_height/2;
	this.camera_Top.position.x = level.TILESIZE * level.map_width/2 +4.6;
	this.camera_Top.rotation.x = -Math.PI/2;

	this.renderer.setClearColor(0x53B3FF);
	this.renderer.setSize(window.innerWidth,window.innerHeight);

	document.body.appendChild(this.renderer.domElement);

	var canvas2 = document.getElementById("canvasGL2");
	this.renderer2.setSize(window.innerWidth/4,window.innerHeight/4);

	document.body.appendChild(this.renderer2.domElement);
	
	/*
	let canvas = document.getElementById("canvasGL");
	*/

		
	}
}

