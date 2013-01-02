var ThreeRenderer = {
	camera: new THREE.PerspectiveCamera(45, 1.0, 0.1, 999999),
	renderer: new THREE.WebGLRenderer(),
	scene: new THREE.Scene(),
	
	setup: function(viewportElement) {
		ThreeRenderer.viewers = {'area': ThreeAreaViewer};

		ThreeRenderer.camera.position.setZ(300);
		ThreeRenderer.scene.add(ThreeRenderer.camera);
		viewportElement.append(ThreeRenderer.renderer.domElement);
	},
	
	setActorManager: function(actorManager) {
		ThreeRenderer.clear();
		
		if(!actorManager)
			return;
			
		var viewer = ThreeRenderer.viewers[actorManager.type];
		if( !viewer )
			throw "Unrecognized actor manager type '" + actorManager.type + "'. No corresponding viewer found.";
		
		viewer.view(actorManager, ThreeRenderer.scene);
	},
	
	clear: function() {
		console.log("Renderer clearing...");
	},
	
	render: function() {
		ThreeRenderer.renderer.render(ThreeRenderer.scene, ThreeRenderer.camera);
	},
	
	resize: function(size) {
		ThreeRenderer.camera.aspect = size.width / size.height;
		ThreeRenderer.camera.updateProjectionMatrix();
	}
};
