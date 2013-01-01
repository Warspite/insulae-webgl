var AreaScene = function(area) {
	this.area = area;
};

AreaScene.sunSpeed = 0.0001;
AreaScene.sunDistance = 500;

AreaScene.prototype.populateScene = function(area) {
	this.addSunAndMoon(area);
	this.addSky(area);
	this.addOcean(area);	this.addLocations(area);
	
};

AreaScene.prototype.addOcean = function(area) {
	var ocean = new THREE.Mesh(new THREE.PlaneGeometry(1000, 1000), THREExt.material({color: 0x6060ff}));
	ocean.position = new THREE.Vector3(0, 0, -10);
	SceneContainer.addToScene(ocean);
};

AreaScene.prototype.addSunAndMoon = function(area) {
	var sunLight = new THREE.PointLight(0xffe993);
	sunLight.totalElapsedTime = 0;

	sunLight.animate = function(self, ms) {
		self.totalElapsedTime += ms;
		self.position = new THREE.Vector3(
			0,
			AreaScene.sunDistance * Math.sin(self.totalElapsedTime * AreaScene.sunSpeed),
			AreaScene.sunDistance * Math.cos(self.totalElapsedTime * AreaScene.sunSpeed)
		);
	};

	var moonLight = new THREE.PointLight(0x404252);
	moonLight.totalElapsedTime = 0;

	moonLight.animate = function(self, ms) {
		self.totalElapsedTime += ms;
		self.position = new THREE.Vector3(
			0,
			-AreaScene.sunDistance * Math.sin(self.totalElapsedTime * AreaScene.sunSpeed),
			-AreaScene.sunDistance * Math.cos(self.totalElapsedTime * AreaScene.sunSpeed)
		);
	};

	SceneContainer.addToScene(sunLight);
	SceneContainer.addToScene(moonLight);
};

AreaScene.prototype.addSky = function(area) {
	var material = THREExt.material({image: "sky/posx.jpg", color: 0x8080ff});
	material.side = THREE.BackSide;
	SceneContainer.addToScene(new THREE.Mesh(new THREE.CubeGeometry(100000, 100000, 100000), material));};

AreaScene.prototype.addLocations = function(area) {
	$.each(DynamicData.locationsByArea[area.id], function(index, l) {
		var lType = StaticData.locationTypes[l.locationTypeId];
		THREExt.loadMeshAsync({path: "location/" + lType.canonicalName + ".dae", x: 10 * l.coordinatesX, y: 10 * l.coordinatesY, properties: {mouseVisible: true, tooltip: lType.name}}); 
	});
};
