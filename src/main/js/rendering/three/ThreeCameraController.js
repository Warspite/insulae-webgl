var ThreeCameraController = {
	MIN_PITCH: 0.001,
	MAX_PITCH: 1.3,
	MIN_ALTITUDE: 3,
	MAX_ALTITUDE: 80,
	TRANSLATION_SPEED: 0.002,
	PITCH_SPEED: 0.0012,
	ROTATION_SPEED: 0.003,
	ASCENSION_SPEED: 0.025,
	
	camera: null,
	
	setup: function(camera) {
		InputInterpreter.cameraController = ThreeCameraController;
		ThreeCameraController.camera = camera;
		ThreeCameraController.reset();
	},
	
	reset: function() {
		ThreeCameraController.matrix = new THREE.Matrix4(),
		ThreeCameraController.rotation = 0.0;
		ThreeCameraController.pitch = 0.0;
		ThreeCameraController.position = new THREE.Vector3(0, 0, 0);
	},
	
	updateCamera: function() {
		ThreeCameraController.pitch = Math.min(Math.max(ThreeCameraController.pitch, ThreeCameraController.MIN_PITCH), ThreeCameraController.MAX_PITCH);
		ThreeCameraController.position.z = Math.min(Math.max(ThreeCameraController.position.z, ThreeCameraController.MIN_ALTITUDE), ThreeCameraController.MAX_ALTITUDE);
	
		ThreeCameraController.camera.rotation.z = ThreeCameraController.rotation;
		ThreeCameraController.camera.rotation.x = ThreeCameraController.pitch * Math.cos(ThreeCameraController.rotation);
		ThreeCameraController.camera.rotation.y = ThreeCameraController.pitch * Math.sin(ThreeCameraController.rotation);
	
		ThreeCameraController.camera.position = ThreeCameraController.position.clone();
	
		ThreeCameraController.camera.updateProjectionMatrix();
	},
	
	move: function(p) {
		var params = Params.check(p, null, {up: 0, forward: 0, right: 0});
		
		ThreeCameraController.position.z += params.up * ThreeCameraController.ASCENSION_SPEED;
		
		ThreeCameraController.position.x -= params.forward * Math.sin(ThreeCameraController.rotation) * ThreeCameraController.position.z * ThreeCameraController.TRANSLATION_SPEED;
		ThreeCameraController.position.y += params.forward * Math.cos(ThreeCameraController.rotation) * ThreeCameraController.position.z * ThreeCameraController.TRANSLATION_SPEED;

		ThreeCameraController.position.x += params.right * Math.cos(ThreeCameraController.rotation) * ThreeCameraController.position.z * ThreeCameraController.TRANSLATION_SPEED;
		ThreeCameraController.position.y += params.right * Math.sin(ThreeCameraController.rotation) * ThreeCameraController.position.z * ThreeCameraController.TRANSLATION_SPEED;
	},
	
	rotate: function(p) {
		var params = Params.check(p, null, {up: 0, right: 0});
		
		ThreeCameraController.pitch +=    params.up * ThreeCameraController.PITCH_SPEED;
		ThreeCameraController.rotation -= params.right * ThreeCameraController.ROTATION_SPEED;
	},

	zoom: function(zoom) {
		ThreeCameraController.move({up: -zoom});
	},
};
