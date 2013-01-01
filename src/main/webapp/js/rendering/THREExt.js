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
	
	loadMeshAsync : function(p) {
		var params = Params.check(p, ['path'], {x: 0, y: 0, z: 0, properties: {}, callback: function(mesh) { SceneContainer.addToScene(mesh);}});
			
		THREExt.loader.load(Paths.MESH_ROOT + params.path, function(collada) {
			var mesh = collada.scene;
			mesh.position.set(params.x, params.y, params.z);
			mesh.updateMatrix();

			for(i in params.properties)
				mesh[i] = params.properties[i];

			params.callback(mesh);
		}); 
	}
};
