var Paths = {
	MESH_ROOT : "../../../../main/webapp/meshes/",
	IMAGE_ROOT : "../../../../main/webapp/images/",
	JAVASCRIPT_ROOT : "../../../../main/webapp/js/",
	SOUND_ROOT : "../../../../main/webapp/sound/"
}

function include(file, onload) {
	if (document.createElement && document.getElementsByTagName) {
		var head = document.getElementsByTagName('head')[0];
		var script = document.createElement('script');
		script.setAttribute('type', 'text/javascript');
		script.setAttribute('src', Paths.JAVASCRIPT_ROOT + file);

		if(onload)
			script.onload = onload;
			
		head.appendChild(script);
	}
}

include("Include.js");

function generalMock() {
	THREExt.material = function(params) {
		return new THREE.MeshLambertMaterial({
			color : params.color || 0x808080
		});
	}
	
	THREExt.loader = {
		load : function(path, callback) {
			var mesh = new THREE.Mesh(new THREE.SphereGeometry(5.0, 16, 16), THREExt.material({color: 0xff0000}));
			callback({scene: mesh});
		}
	};	
}

