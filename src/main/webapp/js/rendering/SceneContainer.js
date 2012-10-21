var SceneContainer = {
	init : function(keyboard) {
		SceneContainer.renderer = new THREE.WebGLRenderer();
		SceneContainer.camera = new THREE.PerspectiveCamera(45, 1.0, 0.1, 999999);
		SceneContainer.camera.position.setZ(300);
		SceneContainer.scene = new THREE.Scene();
		SceneContainer.renderer.setSize(640, 480);
		SceneContainer.lastRenderCycle = new Date().getTime();

		SceneContainer.sceneObjects = new Array();

		$('#sceneContainer').append(SceneContainer.renderer.domElement);

		SceneContainer.scene.add(SceneContainer.camera);

		SceneContainer.render();
				
		SceneContainer.cameraController = new CameraController({camera: SceneContainer.camera, keyboard: keyboard});
	},

	configureCamera : function() {
		SceneContainer.camera.aspect = SceneContainer.renderer.context.drawingBufferWidth / SceneContainer.renderer.context.drawingBufferHeight;		SceneContainer.camera.updateProjectionMatrix();	},

	render : function() {
		var now = new Date().getTime();
		var elapsedTime = now - SceneContainer.lastRenderCycle;

		$.each(SceneContainer.sceneObjects, function(index, o) {
			if (o.animate)
				o.animate(o, elapsedTime);
		});

		SceneContainer.configureCamera();

		SceneContainer.renderer.render(SceneContainer.scene, SceneContainer.camera);
		SceneContainer.lastRenderCycle = now;

		requestAnimFrame(SceneContainer.render);
	},

	addToScene : function(o) {
		SceneContainer.scene.add(o);
		SceneContainer.sceneObjects.push(o);
	},

	removeFromScene : function(o) {
		SceneContainer.sceneObjects = jQuery.grep(SceneContainer.sceneObjects, function(value) {
			return value != o;
		});

		SceneContainer.scene.remove(o);
		SceneContainer.renderer.deallocateObject(o);
	},

	clearScene : function() {
		$.each(SceneContainer.sceneObjects, function(index, o) {
			SceneContainer.scene.remove(o);
			SceneContainer.renderer.deallocateObject(o);
		});

		SceneContainer.sceneObjects = new Array();
	},
};
