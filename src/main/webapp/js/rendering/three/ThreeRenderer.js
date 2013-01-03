var ThreeRenderer = {
	camera: new THREE.PerspectiveCamera(45, 1.0, 0.1, 999999),
	renderer: new THREE.WebGLRenderer(),
	scene: new THREE.Scene(),
	viewer: null,
	
	setup: function(viewportElement) {
		ThreeRenderer.viewers = {'area': ThreeAreaViewer};

		ThreeRenderer.camera.position.setZ(300);
		viewportElement.append(ThreeRenderer.renderer.domElement);
	},
	
	setSceneContent: function(sceneContent) {
		ThreeRenderer.clear();
		
		if(!sceneContent)
			return;
			
		ThreeRenderer.viewer = ThreeRenderer.viewers[sceneContent.type];
		if( !ThreeRenderer.viewer )
			throw "Unrecognized scene content type '" + sceneContent.type + "'. No corresponding viewer found.";
		
		ThreeRenderer.viewer.view(sceneContent, ThreeRenderer.scene);
	},
	
	clear: function() {
		console.log("Renderer clearing...");
		ThreeRenderer.viewer = null;
		THREExt.clearChildren(ThreeRenderer.scene);
		ThreeRenderer.scene.add(ThreeRenderer.camera);
	},
	
	render: function() {
		ThreeRenderer.renderer.render(ThreeRenderer.scene, ThreeRenderer.camera);
	},
	
	resize: function(size) {
		ThreeRenderer.renderer.setSize(size.width, size.height);
		ThreeRenderer.camera.aspect = size.width / size.height;
		ThreeRenderer.camera.updateProjectionMatrix();
	},
	
	animate: function(heartbeat) {
		if(ThreeRenderer.viewer)
			ThreeRenderer.viewer.animate(heartbeat);
	}
};
