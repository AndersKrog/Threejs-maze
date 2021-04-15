export default class Visitor{
	constructor(scene){
		
		this.body = new THREE.Object3D();
		
		this.body.position.x = 5;
		this.body.position.y = 0;
		this.body.position.z = 2;
	
		this.moveSpeed = 0.05;
		this.rotationSpeed = 3 * (Math.PI/180);	//degrees per frame

		this.turnDirection = 0;	//-1:left, 1:right
		this.walkDirection = 0;	//-1:backwards, 1:forwards

		// model
		const geometry = new THREE.ConeGeometry( 0.2, 0.6, 32 );
		const material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
		this.visitorModel = new THREE.Mesh( geometry, material );
		this.visitorModel.rotation.x = -Math.PI/2;
		this.visitorModel.position.y = 0.5;
		scene.add(this.visitorModel);
	}	
	update(level, camera_FP){
		this.body.rotation.y += this.turnDirection * this.rotationSpeed;

		let moveStep = this.walkDirection * this.moveSpeed;

		var newX = this.body.position.x + Math.sin(this.body.rotation.y) * moveStep;
		let newZ = this.body.position.z + Math.cos(this.body.rotation.y) * moveStep;

		// Virker, men det ville give mening hvis kameraet er lidt bagved spilleren, så man ikke kommer til at kunne se gennem vægge.
		// bagved med på linje med visitor

		// hitdetection
		if (level.hasWallAt(newX,newZ) == 0 ){	
			this.body.position.z = newZ;
			this.body.position.x = newX;
		}

		this.visitorModel.position.x = this.body.position.x;
		this.visitorModel.position.z = this.body.position.z;

		this.visitorModel.rotation.z = this.body.rotation.y;	

		camera_FP.position.z = this.body.position.z;
		camera_FP.position.x = this.body.position.x;
		camera_FP.rotation.y = this.body.rotation.y;

	}
	updatePosition(e,camera_FP){
	// https://github.com/mrdoob/three.js/blob/master/examples/jsm/controls/PointerLockControls.js
		
		var euler = new THREE.Euler(0,0,0, 'YXZ');

		euler.setFromQuaternion(camera_FP.quaternion);
		euler.y -= e.movementX/100;
		euler.x -= e.movementY/100;

		//camera_FP.rotation.y -= e.movementY/100;
		
		euler.x = Math.max( Math.PI/2 - Math.PI, Math.min(Math.PI/2, euler.x ) );
	
		//camera_FP.quaternion.setFromEuler(euler);
	}
}
