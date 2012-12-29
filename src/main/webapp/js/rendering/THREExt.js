var THREExt = {
	loader : new THREE.ColladaLoader(),

	material : function(params) {
		if (params.image) {
			return new THREE.MeshLambertMaterial({
				map : THREE.ImageUtils.loadTexture(Paths.IMAGE_ROOT + "texture/" + params.image)
			});
		}

		if (params.color) {
			return new THREE.MeshLambertMaterial({
				color : params.color
			});
		}

		return new THREE.MeshLambertMaterial({
			color : 0x808080
		});
	},
	
	loadMeshAsync : function(params) {
		if(!params.path)
			throw "Missing required parameter: path";
			
		var x = params.x || 0;
		var y = params.y || 0;
		var z = params.z || 0;
		var callback = params.callback || function(mesh) { SceneContainer.addToScene(mesh); };
			
		THREExt.loader.load(Paths.MESH_ROOT + params.path, function(collada) {
			var mesh = collada.scene;
			mesh.position.set(x, y, z);
			mesh.updateMatrix();
			mesh.mouseVisible = true;
			callback(mesh);
		}); 
	}
};
