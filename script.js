
import Visitor from './visitor.js';
import Level from './level.js';
import InputHandler from './inputhandler.js';

var level = new Level();
var scene = new THREE.Scene();
var visitor = new Visitor(scene);
var camera_FP;
var inputHandler = new InputHandler(visitor,camera_FP);

level.generate(scene);

/*
Kamera:
Det er muligt at lave et ArrayCamera, hvis man ønsker at bruge flere kameraer på en gang:
https://threejs.org/docs/#api/en/cameras/ArrayCamera
https://github.com/mrdoob/three.js/blob/master/examples/webgl_camera_array.html
*/

camera_FP = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);

let mapScale = 150;
var camera_Top = new THREE.OrthographicCamera(window.innerWidth/ -mapScale,window.innerWidth/ mapScale, window.innerHeight/mapScale, window.innerHeight/-mapScale, 1,1000);

camera_Top.position.y = 10;
camera_Top.position.z = level.map_height/2;
camera_Top.position.x = level.map_width/2;
camera_Top.rotation.x = -Math.PI/2;

var cameras = [];
// test
	const AMOUNT = 4;
	const ASPECT_RATIO = window.innerWidth / window.innerHeight;
	const WIDTH = ( window.innerWidth / AMOUNT ) * window.devicePixelRatio;
	const HEIGHT = ( window.innerHeight / AMOUNT ) * window.devicePixelRatio;
	for ( let y = 0; y < AMOUNT; y ++ ) {
		for ( let x = 0; x < AMOUNT; x ++ ) {
			const subcamera = new THREE.PerspectiveCamera( 75, ASPECT_RATIO, 0.1, 1000 );
			subcamera.viewport = new THREE.Vector4( Math.floor( x * WIDTH ), Math.floor( y * HEIGHT ), Math.ceil( WIDTH ), Math.ceil( HEIGHT ) );
			//subcamera.position.x = 0.5;
			//subcamera.position.y = 0.5;
			//subcamera.position.z = 2.5;
			//subcamera.position.multiplyScalar( 2 );
			//subcamera.lookAt( 0, 0, 0 );
			subcamera.updateMatrixWorld();
			cameras.push(subcamera);
		}
	}
// test

var camera = new THREE.ArrayCamera(cameras);

var renderer = new THREE.WebGLRenderer({ canvas: canvasGL, antialias: true});
var canvas = document.getElementById("canvasGL");
renderer.setClearColor("#e5e5e5");
renderer.setSize(window.innerWidth/2,window.innerHeight/2);

document.body.appendChild(renderer.domElement);

var renderer2 = new THREE.WebGLRenderer({ canvas: canvasGL2, antialias: true});
var canvas2 = document.getElementById("canvasGL2");
renderer2.setClearColor("#e5e5e5");
renderer2.setSize(window.innerWidth/2,window.innerHeight/2);

// for at få skærmen til at opdatere canvas når vinduet størrelse ændres
// der er en fejl!!
/*
window.addEventListener('resize', () => {
	renderer.setSize(window.innerWidth,window.innerHeight);
	camera.aspect = window.innerWidth/window.innerHeight;
	
	camera.updateProjectionMatrix();

});
*/

// pointer lock API
//https://developer.mozilla.org/en-US/docs/Web/API/Pointer_Lock_API

canvas.requestPointerLock = canvas.requestPointerLock ||
                            canvas.mozRequestPointerLock;

document.exitPointerLock = document.exitPointerLock ||
                           document.mozExitPointerLock;

canvas.onclick = function() {
  canvas.requestPointerLock();
  // skal eventuelt slås fra, hvis musen ikke er fanget


	/*
	//document.addEventListener("mousemove", function () {visitor.updatePosition(e,camera_FP)}, true);
	hvis man skal passe et argument sammen med eventet kan det gøres således:
	*/
	document.addEventListener("mousemove", (e) => {visitor.updatePosition(e,camera_FP)}, true);
};

// dette skal struktureres på en anden måde bør kædes sammen med inputhandler klassen

// gameloop
function render(){
	requestAnimationFrame(render);
	
	visitor.update(level,camera_FP,camera);

	renderer.render(scene,camera_FP);
	renderer2.render(scene,camera_Top);
}

render();