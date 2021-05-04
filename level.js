export default class Level{
	constructor(){
		this.TILESIZE = 0.5;
		this.map_width = 85;
		this.map_height = 28;
		this.grid_floor0;
		this.grid_floor1;
	
		this.grid_floor0_txt = [
	//	 0         10		 20        30        40        50        60        70        80        90        100
	//   |         |         |         |         |         |         |         |         |         |         |
		"11111111111111111111111111111111111111111111111111111111111111111111111          1111",
		"1         1          1   1   1   1                          1      1                1",
		"1         1          1   1   1   1          1               1      1                1",
		"1         1          1   1   1   1                          1      1       L        1",
		"1         1          1   1   1   1          1               1      1                1",
		"1    L    1     L    1   1   1   1                          1      1                1",
		"1         1          1   1   1   1          1               1      1                1",
		"1         1          1   1   1   1                          1      1                1",
		"1         1          1   1   1   1          1               1      1       L        1",
		"1         1          1   1   1   1                          1      1                1",
		"111111  11111111  11111  1  11  111111  1111111111  1111111111  1111                1",
		"1                                                                  1                1",
		"1                                                                  1                1",
		"     L        L       L       L          L          L        L                      1",
		"                                                                            112221111",
		"1                                                                  1        1       1",
		"1                                                                  1        1       1",
		"111111  11111  1111  111111  1111111111  111111  111111  11111  1111                1",
		"1          1    1      1       1                   1       1       1                1",
		"1          1    1      1       1           1       1       1       1        1       1",
		"1          1    1      1       1                   1       1       1        1       1",
		"1          1    1      1       1           1       1       1       1        111111111",
		"1          1    1      1       1                   1       1       11  1    1       1",
		"1    L     1    1      1       1           1       1       1       11  1            1",
		"1          1    1      1       1                   1       1       11  1            1",
		"1          1    1      1       1           1       1       1       11  1            1",
		"1          1    1      1       1                   1       1       11111    1       1",
		"1111111111111111111111111111111111111111111111111111111111111111111111111111111111111"
		];
		this.grid_floor1_txt = [
	//	 0         10		 20        30        40        50        60        70        80        90        100
	//   |         |         |         |         |         |         |         |         |         |         |
		"1122221222111122111221112211111111111111111111111111111111111111111111111111111111111",
		"1          1     1    1    1    1    1          1         1        1    1           1",
		"1          1     1    1    1    1    1          1         1        1    1           1",
		"1          1     1    1    1    1    1          1         1        1    1           1",
		"1          1     1    1    1    1    1          1         1        1    1           1",
		"1          1     1    1    1    1    1          1         1        1    1           1",
		"1          1     1    1    1    1    1          1         1        1    1           1",
		"1          1     1    1    1    1    1          1         1        1    1           1",
		"1          1     1    1    1    1    1          1         1        1    1           1",
		"1          1     1    1    1    1    1          1         1        11  11  1111111111",
		"1          111  11  111  111  111  1111111  111111111  1111111  1111                1",
		"1          1                                                       1                1",
		"1          1                                                       1         1      1",
		"                                                                           1111111111",
		"                                                                           1        1",
		"1          1                                                       1                1",
		"1          1                                                       1                1",
		"1          1111111  11111111111111111111  111111111111111  111111  1       1        1",
		"1          1                                         1        1    1       1111111111",
		"1          1                 1                       1        1    1       1        1",
		"1          1                                         1        1    1       1        1",
		"1          1                 1                       1        1    11  1   1        1",
		"1          1                                         1        1    11  1            1",
		"1          1                 1                       1        111  11  1            1",
		"1          1                                         1        1    11  1   1        1",
		"1          1                 1                       1        1    11  1   1        1",
		"1          1                                         1        1    11  1   1        1",
		"1111111111111111111111111111111111111111111111111111111111111111111111111111111111111"
	];
		
	this.grid_floor0 = this.txt_to_array(this.grid_floor0_txt);
	this.grid_floor1 = this.txt_to_array(this.grid_floor1_txt);	

    }
	
	load_txt_file(htmltag,file_name){
		var req=new XMLHttpRequest();
		req.onreadystatechange=function() {
			if (req.readyState==4 && req.status==200) {
				// problem med asynkron læsning
				// men kan skrives til html som en simpel løsning;
				document.getElementById(htmltag).innerHTML=req.responseText;
			}
		}
		req.open("GET",file_name,true);
		req.send();
	}

	txt_to_array2(htmltag){
		var txt = document.getElementById(htmltag).innerHTML;
		console.log(txt);
	}

	
	txt_to_array(txt_arr){
		// tager et array af strings og returnerer et 2dimensionelt array af enkelte tegn
		var array_tmp = [];
			for (var row = 0; row < txt_arr.length; row++){
				// array til hver række
				var rowar = [];
				for (var column = 0; column < txt_arr[row].length; column++){
					var item = txt_arr[row].slice(column,column+1);
					rowar.push(item);
				}
			array_tmp.push(rowar);
		}
	return array_tmp;
	}
	
	hasWallAt(x,z){
		
		// der skal tages højde for, hvilken etage man er på
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
					light3.position.set(column*this.TILESIZE + 0.5*this.TILESIZE, floor_number*this.TILESIZE*7 -1.5*this.TILESIZE,row*this.TILESIZE + 0.5*this.TILESIZE);
					scene.add(light3);
					const sphereSize = 1;
					//helper
					const pointLightHelper = new THREE.PointLightHelper( light3, sphereSize );
					scene.add( pointLightHelper );
					break;
				}
			}
		}
	}
	
	generate(scene){

		//test
		this.load_txt_file("floor0",'assets/floor0.txt');

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
		var materialf = new THREE.MeshLambertMaterial({map: linoleum});
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

		var light = new THREE.PointLight(0xFFFFFF,1,500);
		light.position.set(10,5,25)
		//scene.add(light);

		var light3 = new THREE.PointLight(0xFFFFFF,1,500);
		light3.position.set(10,5,-25)
		//scene.add(light3);
		

		const alight = new THREE.AmbientLight( 0x404040 ); // soft white light
		alight.intensity = 0.2;
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
            Mesh = gltf.scene;
            Mesh.scale.set(0.1,0.1,0.1);
            scene.add(Mesh);
            Mesh.position.x = 6;
            Mesh.position.y = -0.75;
            Mesh.position.z = 5.7;
			Mesh.rotation.y = 1.5* Math.PI;
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