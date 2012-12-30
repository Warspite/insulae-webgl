var Paths = {
	MESH_ROOT : "meshes/",
	IMAGE_ROOT : "images/",
	JAVASCRIPT_ROOT : "js/",
	SOUND_ROOT : "sound/"
}

function include(file, onload) {
	var loaded = false;
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

var area = {
	id : 1,
	name : "testArea",
	areaTypeId : 1
};
var areaScene = null;

window.onload = function(event) {
	Init.run();
};
