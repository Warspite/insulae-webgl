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
		
		// params.path = "location/buffalo.js";
		// params.scale = 0.01;
// 		
		// new THREE.JSONLoader().load( Paths.MESH_ROOT + params.path, function( geometry, materials ) {
			// var material = new THREE.MeshFaceMaterial( materials );
			// var mesh = new THREE.SkinnedMesh(geometry, material, false );
			// mesh.position.set(params.x, params.y, params.z);
			// mesh.scale.x = mesh.scale.y = mesh.scale.z = params.scale;
//       		
			// var originalMaterial = materials[ 0 ];
			// originalMaterial.skinning = true;
			// originalMaterial.transparent = true;
			// originalMaterial.alphaTest = 0.75;
// 		
			// // for(i in params.properties)
				// // mesh[i] = params.properties[i];
//  
			// params.callback(mesh);
		// });
		
		// THREExt.getLoader().load(Paths.MESH_ROOT + params.path, function(collada) {
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
		
		// params.path = "location/plains.js";
		// new THREE.JSONLoader().load(Paths.MESH_ROOT + params.path, function( geometry, materials ) {
			// //var material = new THREE.MeshLambertMaterial( materials );
			// var material = new THREExt.material({image: "location/grassyHills.png"})
			// var mesh = new THREE.SkinnedMesh(geometry, material, false );
			// mesh.position.set(params.x, params.y, params.z);
			// mesh.scale.x = mesh.scale.y = mesh.scale.z = params.scale;
//       		
			// for(i in params.properties)
				// mesh[i] = params.properties[i];
// 
			// params.callback(mesh);
	},
		
	loadSceneAsync : function(p) {
		var params = Params.check(p, ['path', 'callback'], {x: 0, y: 0, z: 0, scale: 1.0, properties: {}});

		new THREE.SceneLoader().load(Paths.MESH_ROOT + params.path + ".js", function( result ) {
			var mesh = result.scene;
			mesh.position.set(params.x, params.y, params.z);
			mesh.scale.x = mesh.scale.y = mesh.scale.z = params.scale;
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
