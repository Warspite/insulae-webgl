var THREExt = {
	sceneLoader: new THREE.SceneLoader(),
	queuedLoadRequests: {},
	loadedScenes: {},
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
	
	__prepareMeshAndCallBack : function(scene, params) {
		var newScene = new THREE.Scene();
		for(i in scene.children) {
			var c = scene.children[i];
			if(!(c instanceof THREE.Mesh))
				continue;
				
			newScene.add(new THREE.Mesh(c.geometry, c.material)); 
		}

		newScene.position.set(params.x, params.y, params.z);
		newScene.updateMatrix();
		for(i in params.properties)
			newScene[i] = params.properties[i];

		params.callback(newScene);
	},
	
	__sceneLoaded : function(path) {
		for(i in THREExt.queuedLoadRequests[path])
			THREExt.__prepareMeshAndCallBack(THREExt.loadedScenes[path], THREExt.queuedLoadRequests[path][i]);
	},
	
	loadSceneAsync : function(p) {
		var params = Params.check(p, ['path', 'callback'], {x: 0, y: 0, z: 0, scale: 1.0, properties: {}, loadTimeElapsed: 0});
		
		if(THREExt.loadedScenes.hasOwnProperty(params.path)) {
			THREExt.__prepareMeshAndCallBack(THREExt.loadedScenes[params.path], params);
			return;
		}
		
		if(!THREExt.queuedLoadRequests.hasOwnProperty(params.path)) {
			THREExt.queuedLoadRequests[params.path] = new Array();
			console.log("Loading scene from " + params.path);
			THREExt.sceneLoader.load(Paths.MESH_ROOT + params.path + ".js", function( result ) {
				THREExt.loadedScenes[params.path] = result.scene;
				THREExt.__sceneLoaded(params.path);
			}); 
		}
		
		THREExt.queuedLoadRequests[params.path].push(params);
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
