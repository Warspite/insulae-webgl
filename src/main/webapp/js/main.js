var Paths = {
	IMAGE_ROOT : "images/",
	JAVASCRIPT_ROOT : "js/",
	SOUND_ROOT : "sound/"
}

function include(file) {
	if (document.createElement && document.getElementsByTagName) {
		var head = document.getElementsByTagName('head')[0];
		var script = document.createElement('script');
		script.setAttribute('type', 'text/javascript');
		script.setAttribute('src', Paths.JAVASCRIPT_ROOT + file);
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
	var keyboard = new Keyboard();
	DynamicData.setup();
	SceneContainer.init(keyboard);

	DynamicData.setAreaLocations(area.id, [{
		id : 1,
		areaId : area.id,
		coordinatesX : 0,
		coordinatesY : 0,
		locationTypeId : 1
	}, {
		id : 2,
		areaId : area.id,
		coordinatesX : 1,
		coordinatesY : 0,
		locationTypeId : 1
	}, {
		id : 3,
		areaId : area.id,
		coordinatesX : 0,
		coordinatesY : 1,
		locationTypeId : 2
	}, {
		id : 4,
		areaId : area.id,
		coordinatesX : 1,
		coordinatesY : 1,
		locationTypeId : 2
	}, {
		id : 5,
		areaId : area.id,
		coordinatesX : 0,
		coordinatesY : 2,
		locationTypeId : 3
	}, {
		id : 6,
		areaId : area.id,
		coordinatesX : 1,
		coordinatesY : 2,
		locationTypeId : 4
	}]);

	StaticData.locationTypes = {
		1 : {
			id : 1,
			name : "Plains",
			description : "Very pretty plains",
			canonicalName : "plains",
			color : "bfba28"
		},
		2 : {
			id : 2,
			name : "Forest",
			description : "Very pretty forest",
			canonicalName : "forest",
			color : "10f81f"
		},
		3 : {
			id : 3,
			name : "Grassy hills",
			description : "Very pretty grassy hills",
			canonicalName : "grassyHills",
			color : "72bd82"
		},
		4 : {
			id : 4,
			name : "Rocky hills",
			description : "Very pretty rocky hills",
			canonicalName : "rockyHills",
			color : "bdb572"
		},
	};

	areaScene = new AreaScene(area);
	areaScene.populateScene(area);

	//StaticData.load(Scene.splash.loadingProgress);
};