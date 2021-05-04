export default class Level{
	constructor(){
		this.TILESIZE = 0.5;
		this.map_width = 85;
		this.map_height = 28;
		this.grid_floor0;
		this.floor0_walls = new THREE.Group();
		this.grid_floor1;
    }
	
	load_txt_file(htmltag,file_name){
		// indlæser data fra txt.fil og returnerer et 2dimensionelt array med de enkelte karakterer
		var request = new XMLHttpRequest();
		request.open('GET', file_name, false);  // 'false' gør kaldet synkront
		request.send(null);

		let txt;

		if (request.status === 200) {
			txt = request.responseText;
		}
				
		var txtar = txt.split("\n");
		
		let array_tmp = [];
		
		// tager et array af strings og returnerer et 2dimensionelt array af enkelte tegn
			for (var row = 0; row < txtar.length; row++){
				// array til hver række
				var rowar = [];
				for (var column = 0; column < txtar[row].length; column++){
					var item = txtar[row].slice(column,column+1);
					rowar.push(item);
				}
			array_tmp.push(rowar);
			}

		return array_tmp;
	}
	hasWallAt(x,z){
		// virker ikke pt.
		// der skal tages højde for, hvilken etage man er på. og hvad man kan gå igennem
		if (x < 0 || x > this.map_width || z < 0 || z > this.map_height){
			return true;
		}
		var mapGridIndexX = Math.floor(x/this.TILESIZE);
		var mapGridIndexZ = Math.floor(z/this.TILESIZE);
	}
	
	arr_to_floor(scene,grid_floor,floor_number){
		// floor 0
		const loader = new THREE.TextureLoader();
		const heightMap = loader.load('assets/noise.jpg');
		const linoleum = loader.load('assets/linoleum.jpg');
		const ceiling = loader.load('assets/ceiling.jpg');
		const ceiling1 = loader.load('assets/ceiling.jpg');
		const wall = loader.load('assets/wall.png');
		const windowwall = loader.load('assets/windowwall.png');
		
		for (let row = 0; row < grid_floor.length; row++){
			for (let column = 0; column < grid_floor[row].length; column++){
				switch(grid_floor[row][column]){
				case " ":
					break;
				case "1":
					var geometry = new THREE.BoxGeometry(this.TILESIZE,this.TILESIZE*5,this.TILESIZE);
					var material = new THREE.MeshStandardMaterial({ map: wall});
					var mesh = new THREE.Mesh(geometry,material);
					mesh.position.x = column*this.TILESIZE + 0.5*this.TILESIZE; 
					mesh.position.y = floor_number*3.5;
					mesh.position.z = row*this.TILESIZE + 0.5*this.TILESIZE;
					this.floor0_walls.add(mesh);
					scene.add(mesh);
					break;
				case "2":
					var geometry = new THREE.BoxGeometry(this.TILESIZE,this.TILESIZE*2,this.TILESIZE);
					var material = new THREE.MeshStandardMaterial({  map: windowwall});
					var mesh = new THREE.Mesh(geometry,material);
					mesh.position.x = column*this.TILESIZE + 0.5*this.TILESIZE; 
					mesh.position.y = floor_number*this.TILESIZE*7 -1.5*this.TILESIZE;
					mesh.position.z = row*this.TILESIZE + 0.5*this.TILESIZE;
					scene.add(mesh);

					var geometryw = new THREE.BoxGeometry(this.TILESIZE,this.TILESIZE*3,this.TILESIZE/8);
					var materialw = new THREE.MeshPhysicalMaterial({ color: 0x0033FF});
					materialw.transparent = true;
					materialw.opacity = 0.2;
					var meshw = new THREE.Mesh(geometryw,materialw);
					meshw.position.x = column*this.TILESIZE + 0.5*this.TILESIZE; 
					meshw.position.y = floor_number*this.TILESIZE*7 + this.TILESIZE;
					meshw.position.z = row*this.TILESIZE + 0.5*this.TILESIZE;
					scene.add(meshw);
					break;
				case "L":
					var light3 = new THREE.PointLight(0xFFFFDD,1,8,2);
					light3.position.set(column*this.TILESIZE, 0.25 + floor_number*this.TILESIZE*7 ,row*this.TILESIZE + 0.5*this.TILESIZE);
					scene.add(light3);
					
					//helper
					/*
					const sphereSize = 1;
					const pointLightHelper = new THREE.PointLightHelper( light3, sphereSize );
					scene.add( pointLightHelper );
					*/
					break;
				}
			}
		}
	}
	
	generate(scene){

		//indlæs levelfiler
		this.grid_floor0 = this.load_txt_file('floor0','assets/floor0.txt');
		this.grid_floor1 = this.load_txt_file('floor1','assets/floor1.txt');

		// load textures
		const loader = new THREE.TextureLoader();
		const heightMap = loader.load('assets/noise.jpg');
		const linoleum = loader.load('assets/linoleum.jpg');
		const ceiling = loader.load('assets/ceiling.jpg');
		const ceiling1 = loader.load('assets/ceiling.jpg');
		const wall = loader.load('assets/wall.png');
		const windowwall = loader.load('assets/windowwall.png');
		
		this.arr_to_floor(scene,this.grid_floor0,0);
		this.arr_to_floor(scene,this.grid_floor1,1);

		// floor
		var geometryf = new THREE.BoxGeometry(this.map_width*this.TILESIZE,0.5,this.map_height*this.TILESIZE);

		linoleum.wrapS = THREE.RepeatWrapping;
		linoleum.wrapT = THREE.RepeatWrapping;
		linoleum.repeat.set(30,30);
		var materialf = new THREE.MeshStandardMaterial({map: linoleum});
		var meshf = new THREE.Mesh(geometryf,materialf);
		meshf.position.x = this.TILESIZE * this.map_width/2; 
		meshf.position.y = -1.5;
		meshf.position.z = this.TILESIZE * this.map_height/2;
		scene.add(meshf);

		var meshf2 = new THREE.Mesh(geometryf,materialf);
		meshf2.position.x = this.TILESIZE * this.map_width/2; 
		meshf2.position.y = -1.25 + 3.25;
		meshf2.position.z = this.TILESIZE * this.map_height/2;
		scene.add(meshf2);

		// grass
		var geometryg = new THREE.PlaneBufferGeometry(this.map_width*2,this.map_height*2,32,32);			//(this.map_width,1,this.map_height);
		var materialg = new THREE.MeshStandardMaterial({color: 0x00DD44, map: heightMap, displacementMap: heightMap,displacementScale: 2});
		var meshg = new THREE.Mesh(geometryg,materialg);
		meshg.rotation.x = -Math.PI/2;
		meshg.position.x = this.TILESIZE * this.map_width/2; 
		meshg.position.y = -4;
		meshg.position.z = this.TILESIZE *  this.map_height/2;
		scene.add(meshg);

		// ceiling
		var geometryr = new THREE.BoxGeometry(this.map_width*this.TILESIZE,0.5,this.map_height*this.TILESIZE);
		ceiling.wrapS = THREE.RepeatWrapping;
		ceiling.wrapT = THREE.RepeatWrapping;
		ceiling.repeat.set(25,15);
		var materialr = new THREE.MeshStandardMaterial({ map: ceiling});
		var meshr = new THREE.Mesh(geometryr,materialr);
		meshr.position.x = this.TILESIZE * this.map_width/2; 
		meshr.position.y = 5*this.TILESIZE -1;
		meshr.position.z = this.TILESIZE * this.map_height/2;
		scene.add(meshr);
		
		var meshr2 = new THREE.Mesh(geometryr,materialr);
		meshr2.position.x = this.TILESIZE * this.map_width/2; 
		meshr2.position.y = 5*this.TILESIZE -0.75 + 3.25;
		meshr2.position.z = this.TILESIZE * this.map_height/2;
		scene.add(meshr2);

		const alight = new THREE.AmbientLight( 0x404040 ); // soft white light
		alight.intensity = 0.4;
		scene.add( alight );
		
		let modelLoader = new THREE.GLTFLoader();
		let Mesh;

        modelLoader.load('./assets/testfigur.gltf', function(gltf) {
			Mesh = gltf.scene;
			Mesh.scale.set(3.5,3.5,3.5);
			scene.add(Mesh);
            Mesh.position.x = 5;
            Mesh.position.y = -2.5;
            Mesh.position.z = -10;
			});
			
		modelLoader.load('./assets/fire_extinguisher.gltf', function(gltf) {
			Mesh = gltf.scene.clone();
			Mesh.scale.set(0.1,0.1,0.1);
			Mesh.position.x = 6;
			Mesh.position.y = -0.75;
			Mesh.position.z = 5.7;
			Mesh.rotation.y = 1.5* Math.PI;
			scene.add(Mesh);
			});	
		
        modelLoader.load('./assets/lokum.gltf', function(gltf) {
            Mesh = gltf.scene;
            Mesh.scale.set(0.35,0.35,0.35);
            scene.add(Mesh);
            Mesh.position.x = 4.8;
            Mesh.position.y = -0.75;
            Mesh.position.z = 10;
        });
		modelLoader.load('./assets/fridgev2.gltf', function(gltf) {
            Mesh = gltf.scene;
            Mesh.scale.set(1,1,1);
            scene.add(Mesh);
            Mesh.position.x = 4.8;
            Mesh.position.y = -0.75;
            Mesh.position.z = 12;
			Mesh.rotation.y = Math.PI;
        });
		
	}
}