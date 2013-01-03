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
		var params = Params.check(p, ['path', 'callback'], {x: 0, y: 0, z: 0, properties: {}});
			
		THREExt.loader.load(Paths.MESH_ROOT + params.path, function(collada) {
			var mesh = collada.scene;
			mesh.position.set(params.x, params.y, params.z);
			mesh.updateMatrix();

			for(i in params.properties)
				mesh[i] = params.properties[i];

			params.callback(mesh);
		}); 
	},
	
	clearChildren: function(o) {
		if(!o.children)
			return;
			
	    for(var i = o.children.length - 1; i >= 0; i--){
	    	THREExt.clearChildren(o.children[i]);
	    	o.remove(o.children[i]);
	    };		
	}
};
