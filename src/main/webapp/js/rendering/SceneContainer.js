var SceneContainer = {
	id: 'sceneContainer',
	
	init : function(keyboard) {
		SceneContainer.jqElement = $('#' + SceneContainer.id);
		SceneContainer.domElement = SceneContainer.jqElement[0];
		SceneContainer.renderer = new THREE.WebGLRenderer();
		SceneContainer.camera = new THREE.PerspectiveCamera(45, 1.0, 0.1, 999999);
		SceneContainer.camera.position.setZ(300);
		SceneContainer.scene = new THREE.Scene();
		SceneContainer.lastInnerWidth = 0;
		SceneContainer.lastInnerHeight = 0;
		SceneContainer.lastRenderCycle = new Date().getTime();
		SceneContainer.director = null;

		SceneContainer.sceneObjects = new Array();

		SceneContainer.jqElement.append(SceneContainer.renderer.domElement);

		SceneContainer.scene.add(SceneContainer.camera);

		SceneContainer.render();
				
		SceneContainer.cameraController = new CameraController({camera: SceneContainer.camera, keyboard: keyboard});
	},

	configureCamera : function() {
		if(window.innerWidth != SceneContainer.lastInnerWidth || window.innerHeight != SceneContainer.lastInnerHeight) {
			SceneContainer.lastInnerWidth = window.innerWidth;
			SceneContainer.lastInnerHeight = window.innerHeight;
			SceneContainer.renderer.setSize(window.innerWidth, window.innerHeight - Widget.$(TopBarWidget).height());
			SceneContainer.camera.aspect = SceneContainer.renderer.context.drawingBufferWidth / SceneContainer.renderer.context.drawingBufferHeight;
			SceneContainer.camera.updateProjectionMatrix();
		}
	},

	render : function() {
		var now = new Date().getTime();
		var elapsedTime = now - SceneContainer.lastRenderCycle;

		$.each(SceneContainer.sceneObjects, function(index, o) {
			if (o.animate)
				o.animate(o, elapsedTime);
		});
		
		TWEEN.update();

		SceneContainer.configureCamera();

		SceneContainer.renderer.render(SceneContainer.scene, SceneContainer.camera);
		SceneContainer.lastRenderCycle = now;

		requestAnimFrame(SceneContainer.render);
	},

	addToScene : function(o) {
		SceneContainer.scene.add(o);
		SceneContainer.sceneObjects.push(o);
	},

	removeObject : function(o) {
		SceneContainer.sceneObjects = jQuery.grep(SceneContainer.sceneObjects, function(value) {
			return value != o;
		});

		SceneContainer.dispose(o);
	},
	
	removeAndDispose: function(o) {
		SceneContainer.scene.remove(o);
		//SceneContainer.dispose(o);
	},
	
	dispose: function(o) {
		if(o.geometry)
			SceneContainer.dispose(o.geometry);
			
		if(o.material)
			SceneContainer.dispose(o.material);
		
		if(o.dispose)
			o.dispose();
	},

	clearObjects : function() {
		$.each(SceneContainer.sceneObjects, function(index, o) {
			SceneContainer.dispose(o);
		});

		SceneContainer.sceneObjects = new Array();
	},
	
	getAllMeshes : function() {
		var meshes = [];
		
		for(i in SceneContainer.sceneObjects) {
			var o = SceneContainer.sceneObjects[i];
			if(o instanceof THREE.Mesh)
				meshes.push(o);
				
			if(o instanceof THREE.Object3D) {
				var descendants = o.getDescendants();
				for(j in descendants) {
					var d = descendants[j];
					if(d instanceof THREE.Mesh) {
						d.sceneObjectAncestor = o;
						meshes.push(d);
					}
				}
			}
		}
		
		return meshes;
	},
	
	getSize : function() {
		return {width: SceneContainer.renderer.context.drawingBufferWidth, height: SceneContainer.renderer.context.drawingBufferHeight};
	},
	
	setDirector: function(director) {
		SceneContainer.clearObjects();
		SceneContainer.director = director;
		if(SceneContainer.director)
			SceneContainer.director.populate();
	}
};
