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
let inputHandler = new InputHandler(visitor);

let time = new THREE.Clock();

level.generate(scene);

const loader = new THREE.TextureLoader();
const bg = loader.load(
	'assets/sky.jpg',
	() => {
	const rt = new THREE.WebGLCubeRenderTarget(bg.image.height);
	rt.fromEquirectangularTexture(screen.renderer,bg);
	scene.background = rt.texture;
	});


time.start();
// gameloop
function loop(){
	requestAnimationFrame(loop);

	//console.log(time.getElapsedTime ());

	visitor.update(level,screen.camera_FP);
	
	if (visitor.viewMode == 1) {
		screen.renderer.render(scene,screen.camera_FP);
		screen.renderer2.render(scene,screen.camera_Top);
	} else {
		screen.renderer.render(scene,screen.camera_Top);
		screen.renderer2.render(scene,screen.camera_FP);		
	}

}

loop();