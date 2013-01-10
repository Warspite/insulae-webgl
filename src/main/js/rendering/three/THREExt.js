var THREExt = {
	getLoader: function() {
		return new THREE.ColladaLoader();
	},

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
		var params = Params.check(p, ['path', 'callback'], {x: 0, y: 0, z: 0, scale: 1.0, properties: {}});
		params.path = "location/plains.js";
		
		var loader = new THREE.JSONLoader();
		loader.load( Paths.MESH_ROOT + params.path, function( geometry, materials ) {
      		geometry.computeTangents();
      		
			mesh = new THREE.Mesh( geometry, new THREE.MeshLambertMaterial({color: 0x808080}));
			mesh.position.set(params.x, params.y, params.z);
			mesh.scale.x = mesh.scale.y = mesh.scale.z = params.scale;
			mesh.updateMatrix();
      		group.addChild(mesh);

			for(i in params.properties)
				mesh[i] = params.properties[i];
 
			params.callback(mesh);
		});
		
		// new THREExt.getLoader().load(Paths.MESH_ROOT + params.path, function(collada) {
			// var mesh = collada.scene;
			// mesh.position.set(params.x, params.y, params.z);
			// mesh.scale.x = mesh.scale.y = mesh.scale.z = params.scale;
			// mesh.updateMatrix();
// 
			// for(i in params.properties)
				// mesh[i] = params.properties[i];
// 
			// params.callback(mesh);
		// }); 
	},
	
	clearChildren: function(o) {
		if(!o.children)
			return;
			
	    for(var i = o.children.length - 1; i >= 0; i--){
	    	THREExt.clearChildren(o.children[i]);
	    	o.remove(o.children[i]);
	    };		
	},
	
	getDescendants: function(o, out, type) {
		if(!o || !o.children)
			return;
		
		$.each(o.children, function(i, c) {
			if(!type || c instanceof type)
				out.push(c);
				
			THREExt.getDescendants(c, out, type);
		});
	},
};
