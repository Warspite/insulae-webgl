var ThreeRenderer = {
	camera: new THREE.PerspectiveCamera(45, 1.0, 0.1, 999999),
	renderer: new THREE.WebGLRenderer(),
	scene: new THREE.Scene(),
	projector: new THREE.Projector(),
	viewer: null,
	
	setup: function(viewportElement) {
		ThreeRenderer.viewers = {'area': ThreeAreaViewer};
		ThreeRenderer.sceneInteractors = {'area': ThreeAreaInteractor};
		ThreeCameraController.setup(ThreeRenderer.camera);

		viewportElement.append(ThreeRenderer.renderer.domElement);
	},
	
	setSceneContent: function(sceneContent) {
		ThreeRenderer.clear();
		
		if(!sceneContent)
			return;
			
		InputInterpreter.sceneInteractor = ThreeRenderer.sceneInteractors[sceneContent.type];
		ThreeRenderer.viewer = ThreeRenderer.viewers[sceneContent.type];
		if( !ThreeRenderer.viewer )
			throw "Unrecognized scene content type '" + sceneContent.type + "'. No corresponding viewer found.";
		
		ThreeRenderer.viewer.view(sceneContent, ThreeRenderer.scene);
	},
	
	clear: function() {
		InputInterpreter.sceneInteractor = null;
		ThreeRenderer.viewer = null;
		THREExt.clearChildren(ThreeRenderer.scene);
		ThreeRenderer.scene.add(ThreeRenderer.camera);
	},
	
	render: function() {
		ThreeCameraController.updateCamera();
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
	},
	
	getSceneObjectAtCoordinates: function(c) {
		var mouse2dCoordinates = new THREE.Vector3((c.x / Viewport.$().width()) * 2 - 1, -(c.y / Viewport.$().height()) * 2 + 1, 0.5);
		var mouse3dCoordinates = ThreeRenderer.projector.unprojectVector(mouse2dCoordinates, ThreeRenderer.camera);
		var mouseRaycaster = new THREE.Raycaster(ThreeRenderer.camera.position, mouse3dCoordinates.subSelf(ThreeRenderer.camera.position).normalize());
		var meshes = new Array();
		THREExt.getDescendants(ThreeRenderer.scene, meshes, THREE.Mesh); 
		var intersectedMeshes = mouseRaycaster.intersectObjects(meshes);
		
		if(size(intersectedMeshes) > 1) {
			var hej = 0;
		}
		
		for(i in intersectedMeshes) {
			var o = intersectedMeshes[i].object.parent;
			if(o.mouseVisible)
				return o;
		}
		
		return null;
	},
};
