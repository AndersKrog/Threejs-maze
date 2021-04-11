
var TILESIZE = 1;

// ringe video med flere fejl:
// https://www.youtube.com/watch?v=6oFvqLfRnsU&t=1015s

// controls: https://www.html5rocks.com/en/tutorials/pointerlock/intro/

class Level{
	constructor(){}
	map_width = 16;
	map_height = 12;

	grid = [
		[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
		[1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
		[1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 1],
		[1, 0, 1, 0, 0, 1, 1, 0, 0, 0, 1, 0, 1, 1, 0, 1],
		[1, 0, 1, 0, 1, 1, 1, 0, 0, 0, 1, 0, 1, 1, 0, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
		[1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 1],
		[1, 0, 1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1],
		[1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
		[1, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1],
		[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
		];
	hasWallAt(x,z){
		if (x < 0 || x > this.map_width || z < 0 || z > this.map_height){
			return true;
		}
		var mapGridIndexX = Math.floor(x/TILESIZE);
		var mapGridIndexZ = Math.floor(z/TILESIZE);
		
		return this.grid[mapGridIndexZ][mapGridIndexX];
	}

}


class Player{
	constructor(){
	this.pos = new THREE.Vector3(2,0,2);
	this.rotationAngle = 0;
	this.moveSpeed = 0.1;
	this.turnDirection = 0;	//-1:left, 1:right
	this.rotationSpeed = 3 * (Math.PI/180);	//degrees per frame
	this.walkDirection = 0;	//-1:backwards, 1:forwards
	}		
	update(){
		
		this.rotationAngle += this.turnDirection * this.rotationSpeed;

		let moveStep = this.walkDirection * this.moveSpeed;


		// det skyldes måske akserne
		// akserne er byttet om i forhold til tidliger kodeeksmpelr, dvs
		// også sige cos og sin er byttet og turnDirection er vendt om
		var newX = this.pos.x + Math.sin(this.rotationAngle) * moveStep;
		let newZ = this.pos.z + Math.cos(this.rotationAngle) * moveStep;

		// der er noget her der skal vendes rigtigt, eller stemme overens med når klodserne pladseres
		if (level.hasWallAt(newX,newZ) == 0 ){	
		this.pos.z = newZ;
		this.pos.x = newX;
		}

		this.pos.z = newZ;
		this.pos.x = newX;

		

		camera.rotation.y = this.rotationAngle;

		camera.position.z = this.pos.z;
		camera.position.x = this.pos.x;

	}
}

class InputHandler{
	constructor(player){
		// der bør laves noget her, så inputhandleren hæftes på det objekt som det styrer
		// er ikke sikker på dette er den korrekte måde 
		this.player = player;

	document.addEventListener("keydown", event => {
		if (event.keyCode == 37)
			player.turnDirection = 1;
		if (event.keyCode == 39)
			player.turnDirection = -1;
		if (event.keyCode == 38)
			player.walkDirection = -1;
		if (event.keyCode == 40)
			player.walkDirection = 1;
	});
			
	document.addEventListener("keyup", event => {
		if (event.keyCode == 37)
			player.turnDirection = 0;
		if (event.keyCode == 39)
			player.turnDirection = 0;
		if (event.keyCode == 38)
			player.walkDirection = 0;
		if (event.keyCode == 40)
			player.walkDirection = 0;
	});	

	}

}

player = new Player();

inputHandler = new InputHandler(player);

level = new Level();

var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);

var renderer = new THREE.WebGLRenderer({antialias: true});

renderer.setClearColor("#e5e5e5");
renderer.setSize(window.innerWidth,window.innerHeight);

document.body.appendChild(renderer.domElement);



// for at få skærmen til at opdatere canvas når vinduet størrelse ændres
// der er en fejl!!


window.addEventListener('resize', () => {
	renderer.setSize(window.innerWidth,window.innerHeight);
	camera.aspect = window.innerWidth/window.innerHeight;
	
	camera.updateProjectionMatrix();

});

// lav 3d figur:
var geometry1 = new THREE.DodecahedronGeometry(.25,1);
//var material1 = new THREE.MeshLambertMaterial({color: 0xFF2222});
var material1 = new THREE.MeshNormalMaterial({color: 0xFF2222});


var mesh1 = new THREE.Mesh(geometry1,material1);

scene.add(mesh1);


for (let x = 0; x < level.map_width; x++){
	for (let y = 0; y < level.map_height; y++){
		if (level.grid[y][x] != 0){
			var geometry = new THREE.BoxGeometry(1,1,1);
			var material = new THREE.MeshLambertMaterial({color: 0xFFCC00});
			var mesh = new THREE.Mesh(geometry,material);
			mesh.position.x = x; 
			mesh.position.y = 0;
			mesh.position.z = y;
			scene.add(mesh);
			
			}
		}
	}

// floor
var geometryf = new THREE.BoxGeometry(level.map_width,1,level.map_height);
var materialf = new THREE.MeshLambertMaterial({color: 0x00CC00});
var meshf = new THREE.Mesh(geometryf,materialf);
meshf.position.x = +level.map_width/2; 
meshf.position.y = -1;
meshf.position.z = +level.map_height/2;
scene.add(meshf);

// and roof

var geometryr = new THREE.BoxGeometry(level.map_width,1,level.map_height);
var materialr = new THREE.MeshLambertMaterial({color: 0xCCCC00});
var meshr = new THREE.Mesh(geometryr,materialr);
meshr.position.x = +level.map_width/2; 
meshr.position.y = 1;
meshr.position.z = +level.map_height/2;
scene.add(meshr);




var light = new THREE.PointLight(0xFFFFFF,1,500);
light.position.set(10,0,25);

var light1 = new THREE.PointLight(0xF00FFF,1,300);
light.position.set(10,5,25);


scene.add(light);

scene.add(light1);


// gameloop
var render = function(){
	requestAnimationFrame(render);
	
	player.update();
	
	mesh1.position.z = 5;
	mesh1.position.x = 8;
	mesh1.rotation.x += 0.01;
	mesh1.rotation.z += 0.01;

	
	renderer.render(scene,camera);
}

render();
