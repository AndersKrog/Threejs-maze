export default class Level{
	constructor(){
		this.TILESIZE = 1;
		this.map_width = 16;
		this.map_height = 12;
	}

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
		var mapGridIndexX = Math.floor(x/this.TILESIZE);
		var mapGridIndexZ = Math.floor(z/this.TILESIZE);
		
		return this.grid[mapGridIndexZ][mapGridIndexX];
	}
	generate(scene){
		for (let x = 0; x < this.map_width; x++){
			for (let y = 0; y < this.map_height; y++){
				if (this.grid[y][x] != 0){
					var geometry = new THREE.BoxGeometry(1,6,1);
					var material = new THREE.MeshLambertMaterial({color: 0xFFCC00});
					var mesh = new THREE.Mesh(geometry,material);
					mesh.position.x = x+0.5; 
					mesh.position.y = 0;
					mesh.position.z = y+0.5;
					mesh.castShadow = true;
					mesh.receiveShadow = true;
					scene.add(mesh);
				}
			}
		}
	// floor
	var geometryf = new THREE.BoxGeometry(this.map_width,1,this.map_height);
	var materialf = new THREE.MeshLambertMaterial({color: 0x00CC00});
	var meshf = new THREE.Mesh(geometryf,materialf);
	meshf.position.x = this.map_width/2; 
	meshf.position.y = -1;
	meshf.position.z = this.map_height/2;
	meshf.receiveShadow = true;
	scene.add(meshf);

	// roof
	var geometryr = new THREE.BoxGeometry(this.map_width,1,this.map_height);
	var materialr = new THREE.MeshLambertMaterial({color: 0xCCCC00});
	var meshr = new THREE.Mesh(geometryr,materialr);
	meshr.position.x = this.map_width/2; 
	meshr.position.y = 1;
	meshr.position.z = this.map_height/2;
	meshr.receiveShadow = true;
	//scene.add(meshr);

	var light = new THREE.PointLight(0xFFFFFF,1,500);
	light.position.set(10,5,25)

	scene.add(light);

	var light1 = new THREE.SpotLight(0xF00FFF,1,300);
	light1.position.set(10,5,25);
	scene.add(light1);

	}
}