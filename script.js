import Visitor from './visitor.js';
import Level from './level.js';
import InputHandler from './inputhandler.js';
import Screen from './screen.js';

// framerate
(function(){var script=document.createElement('script');script.onload=function(){var stats=new Stats();document.body.appendChild(stats.dom);requestAnimationFrame(function loop(){stats.update();requestAnimationFrame(loop)});};script.src='//mrdoob.github.io/stats.js/build/stats.min.js';document.head.appendChild(script);})()

let level = new Level();
let scene = new THREE.Scene();
let screen = new Screen(level);
let visitor = new Visitor(scene);
let inputHandler = new InputHandler(visitor,screen);

// ur - kan fx bruges til animation eller til at nulstille program
let time = new THREE.Clock();

// himmel
const loader = new THREE.TextureLoader();
const bg = loader.load(
'assets/sky.jpg',
() => {
const rt = new THREE.WebGLCubeRenderTarget(bg.image.height);
rt.fromEquirectangularTexture(screen.renderer,bg);
rt.fromEquirectangularTexture(screen.renderer2,bg);
scene.background = rt.texture;
});

level.generate(scene);

time.start();
// gameloop


// virker ikke!!
level.floor0_walls.matrix.scale(new THREE.Vector3(.2,.20,.1));	
level.floor0_walls.updateMatrix();


function loop(){
	requestAnimationFrame(loop);
	
	
	
	
	//console.log(time.getElapsedTime ());

	visitor.update(level,screen.camera_FP);
	
	if (screen.viewMode == 1) {
		screen.renderer.render(scene,screen.camera_FP);
		screen.renderer2.render(scene,screen.camera_Top);
	} else {
		screen.renderer.render(scene,screen.camera_Top);
		screen.renderer2.render(scene,screen.camera_FP);		
	}
	
}	

loop();