var CameraController = function(params) {
	var self = params.self || this;
	self.checkParams(params);

	mixin(new EventHandler(), self);
	params.keyboard.addEventListener(self);
	self.camera = params.camera;
	self.matrix = new THREE.Matrix4();

	self.addEventHandler(EventType.KEY_DOWN, function(self, source, event) {
		if (event.value.key == Key.Q)
			self.ascend(event.value.elapsedTime * CameraController.ASCENSION_SPEED);

		if (event.value.key == Key.E)
			self.descend(event.value.elapsedTime * CameraController.ASCENSION_SPEED);
		
		if (event.value.key == Key.W)
			self.moveForward(event.value.elapsedTime * CameraController.TRANSLATION_SPEED);

		if (event.value.key == Key.S)
			self.moveBackward(event.value.elapsedTime * CameraController.TRANSLATION_SPEED);

		if (event.value.key == Key.A)
			self.strafeLeft(event.value.elapsedTime * CameraController.TRANSLATION_SPEED);

		if (event.value.key == Key.D)
			self.strafeRight(event.value.elapsedTime * CameraController.TRANSLATION_SPEED);

		if (event.value.key == Key.UP)
			self.pitchUp(event.value.elapsedTime* CameraController.PITCH_SPEED);

		if (event.value.key == Key.DOWN)
			self.pitchDown(event.value.elapsedTime * CameraController.PITCH_SPEED);

		if (event.value.key == Key.LEFT)
			self.rotateLeft(event.value.elapsedTime * CameraController.ROTATION_SPEED);

		if (event.value.key == Key.RIGHT)
			self.rotateRight(event.value.elapsedTime * CameraController.ROTATION_SPEED);
	});
	
	self.rotation = 0.0;
	self.pitch = 0.0;
	self.position = self.camera.position.clone();
	
	self.updateCamera();
};

CameraController.MIN_PITCH = 0.001;
CameraController.MAX_PITCH = 1.0;
CameraController.MIN_ALTITUDE = 30;
CameraController.MAX_ALTITUDE = 600;
CameraController.TRANSLATION_SPEED = 0.002;
CameraController.PITCH_SPEED = 0.0005;
CameraController.ROTATION_SPEED = 0.003;
CameraController.ASCENSION_SPEED = 0.25;

CameraController.prototype.checkParams = function(params) {
	if (!params.keyboard)
		throw "Missing param: keyboard";

	if (!params.camera)
		throw "Missing param: camera";
};

CameraController.prototype.ascend = function(x) {
	this.position.z += x;
	this.updateCamera();
};

CameraController.prototype.descend = function(x) {
	this.position.z -= x;
	this.updateCamera();
};

CameraController.prototype.moveForward = function(x) {
	this.position.x -= x * Math.sin(this.rotation) * this.position.z;
	this.position.y += x * Math.cos(this.rotation) * this.position.z;
	this.updateCamera();
};

CameraController.prototype.moveBackward = function(x) {
	this.position.x += x * Math.sin(this.rotation) * this.position.z;
	this.position.y -= x * Math.cos(this.rotation) * this.position.z;
	this.updateCamera();
};

CameraController.prototype.strafeLeft = function(x) {
	this.position.x -= x * Math.cos(this.rotation) * this.position.z;
	this.position.y -= x * Math.sin(this.rotation) * this.position.z;
	this.updateCamera();
};

CameraController.prototype.strafeRight = function(x) {
	this.position.x += x * Math.cos(this.rotation) * this.position.z;
	this.position.y += x * Math.sin(this.rotation) * this.position.z;
	this.updateCamera();
};

CameraController.prototype.pitchUp = function(x) {
	this.pitch += x;
	this.updateCamera();
};

CameraController.prototype.pitchDown = function(x) {
	this.pitch -= x;
	this.updateCamera();
};

CameraController.prototype.rotateLeft = function(x) {
	this.rotation += x;
	this.updateCamera();
};

CameraController.prototype.rotateRight = function(x) {
	this.rotation -= x;
	this.updateCamera();
};

CameraController.prototype.updateCamera = function() {
	this.pitch = Math.min(Math.max(this.pitch, CameraController.MIN_PITCH), CameraController.MAX_PITCH);
	this.position.z = Math.min(Math.max(this.position.z, CameraController.MIN_ALTITUDE), CameraController.MAX_ALTITUDE);
	
	this.camera.rotation.z = this.rotation;
	this.camera.rotation.x = this.pitch * Math.cos(this.rotation);
	this.camera.rotation.y = this.pitch * Math.sin(this.rotation);
	
	this.camera.position = this.position.clone();
};
