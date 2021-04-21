import Visitor from './visitor.js';
import Level from './level.js';
import InputHandler from './inputhandler.js';


// framerate
(function(){var script=document.createElement('script');script.onload=function(){var stats=new Stats();document.body.appendChild(stats.dom);requestAnimationFrame(function loop(){stats.update();requestAnimationFrame(loop)});};script.src='//mrdoob.github.io/stats.js/build/stats.min.js';document.head.appendChild(script);})()

let level = new Level();
let scene = new THREE.Scene();
let visitor = new Visitor(scene);
let inputHandler = new InputHandler(visitor);

let time = new THREE.Clock();


level.generate(scene);

/*
Kamera:
Det er muligt at lave et ArrayCamera, hvis man ønsker at bruge flere kameraer på en gang:
https://threejs.org/docs/#api/en/cameras/ArrayCamera
https://github.com/mrdoob/three.js/blob/master/examples/webgl_camera_array.html
*/

let camera_FP = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);

let mapScale = 75;
let camera_Top = new THREE.OrthographicCamera(window.innerWidth/ -mapScale,window.innerWidth/ mapScale, window.innerHeight/mapScale,window.innerHeight/-mapScale, 1,1000);

camera_Top.position.y = 500;
camera_Top.position.z = level.TILESIZE * level.map_height/2;
camera_Top.position.x = level.TILESIZE * level.map_width/2 +4.6;
camera_Top.rotation.x = -Math.PI/2;

let renderer = new THREE.WebGLRenderer({ canvas: canvasGL, antialias: true});
let canvas = document.getElementById("canvasGL");
renderer.setClearColor(0x53B3FF);
renderer.setSize(window.innerWidth,window.innerHeight);

document.body.appendChild(renderer.domElement);

var renderer2 = new THREE.WebGLRenderer({ alpha: true, canvas: canvasGL2, antialias: true});
var canvas2 = document.getElementById("canvasGL2");
//renderer2.setClearColor(0xe5e5e5);
renderer2.setSize(window.innerWidth/4,window.innerHeight/4);

document.body.appendChild(renderer2.domElement);

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

// test model
const geometry = new THREE.ConeGeometry( 0.2, 0.6, 32 );
const material = new THREE.MeshBasicMaterial( {color: 0xff0000} );
var testModel = new THREE.Mesh( geometry, material );
testModel.rotation.x = -Math.PI/2;
testModel.position.x = 4;
testModel.position.y = 0;
testModel.position.z = 3;

scene.add(testModel);


const loader = new THREE.TextureLoader();
const bg = loader.load(
	'assets/tears_of_steel_bridge.jpg',
	() => {
	const rt = new THREE.WebGLCubeRenderTarget(bg.image.height);
	rt.fromEquirectangularTexture(renderer,bg);
	scene.background = rt.texture;
	});


time.start();
// gameloop
function loop(){
	requestAnimationFrame(loop);
	

	//console.log(time.getElapsedTime ());

	visitor.update(level,camera_FP);
	
	if (visitor.viewMode == 1) {
		renderer.render(scene,camera_FP);
		renderer2.render(scene,camera_Top);
	} else {
		renderer.render(scene,camera_Top);
		renderer2.render(scene,camera_FP);		
	}

}

loop();