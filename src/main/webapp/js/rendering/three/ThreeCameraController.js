var ThreeCameraController = {
	MIN_PITCH: 0.001,
	MAX_PITCH: 1.0,
	MIN_ALTITUDE: 30,
	MAX_ALTITUDE: 600,
	TRANSLATION_SPEED: 0.002,
	PITCH_SPEED: 0.0005,
	ROTATION_SPEED: 0.003,
	ASCENSION_SPEED: 0.25,
	
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
		ThreeCameraController.pitch = Math.min(Math.max(ThreeCameraController.pitch, ThreeInputHandler.MIN_PITCH), ThreeInputHandler.MAX_PITCH);
		ThreeCameraController.position.z = Math.min(Math.max(ThreeCameraController.position.z, ThreeInputHandler.MIN_ALTITUDE), ThreeInputHandler.MAX_ALTITUDE);
	
		ThreeCameraController.camera.rotation.z = ThreeCameraController.rotation;
		ThreeCameraController.camera.rotation.x = ThreeCameraController.pitch * Math.cos(ThreeCameraController.rotation);
		ThreeCameraController.camera.rotation.y = ThreeCameraController.pitch * Math.sin(ThreeCameraController.rotation);
	
		ThreeCameraController.camera.position = ThreeCameraController.position.clone();
	
		ThreeCameraController.camera.updateProjectionMatrix();
	},
	
	ascend: function(x) {
		ThreeCameraController.position.z += x * ThreeCameraController.ASCENSION_SPEED;
	},
	
	descend: function(x) {
		ThreeCameraController.position.z -= x * ThreeCameraController.ASCENSION_SPEED;
	},
	
	moveForward: function(x) {
		ThreeCameraController.position.x -= x * Math.sin(ThreeCameraController.rotation) * ThreeCameraController.position.z * ThreeCameraController.TRANSLATION_SPEED;
		ThreeCameraController.position.y += x * Math.cos(ThreeCameraController.rotation) * ThreeCameraController.position.z * ThreeCameraController.TRANSLATION_SPEED;
	},
	
	moveBackward: function(x) {
		ThreeCameraController.position.x += x * Math.sin(ThreeCameraController.rotation) * ThreeCameraController.position.z * ThreeCameraController.TRANSLATION_SPEED;
		ThreeCameraController.position.y -= x * Math.cos(ThreeCameraController.rotation) * ThreeCameraController.position.z * ThreeCameraController.TRANSLATION_SPEED;
	},
	
	strafeLeft: function(x) {
		ThreeCameraController.position.x -= x * Math.cos(ThreeCameraController.rotation) * ThreeCameraController.position.z * ThreeCameraController.TRANSLATION_SPEED;
		ThreeCameraController.position.y -= x * Math.sin(ThreeCameraController.rotation) * ThreeCameraController.position.z * ThreeCameraController.TRANSLATION_SPEED;
	},
	
	strafeRight: function(x) {
		ThreeCameraController.position.x += x * Math.cos(ThreeCameraController.rotation) * ThreeCameraController.position.z * ThreeCameraController.TRANSLATION_SPEED;
		ThreeCameraController.position.y += x * Math.sin(ThreeCameraController.rotation) * ThreeCameraController.position.z * ThreeCameraController.TRANSLATION_SPEED;
	},
	
	pitchUp: function(x) {
		ThreeCameraController.pitch += x * ThreeCameraController.PITCH_SPEED;
	},
	
	pitchDown: function(x) {
		ThreeCameraController.pitch -= x * ThreeCameraController.PITCH_SPEED;
	},
	
	rotateLeft: function(x) {
		ThreeCameraController.rotation += x * ThreeCameraController.ROTATION_SPEED;
	},
	
	rotateRight: function(x) {
		ThreeCameraController.rotation -= x * ThreeCameraController.ROTATION_SPEED;
	},
};
