var AreaDirector = function(area) {
	this.area = area;
};

AreaDirector.sunSpeed = 0.0001;
AreaDirector.sunDistance = 500;

AreaDirector.prototype.populate = function() {
	this.addSunAndMoon();
	this.addSky();
	this.addOcean();
	
	var self = this;
	Server.req({
		servlet: "geography/Location",
		params: {areaId: this.area.id},
		successCallback: function(result) { self.locationsLoaded(result.content.locations) }
	});};

AreaDirector.prototype.addOcean = function() {
	var ocean = new THREE.Mesh(new THREE.PlaneGeometry(1000, 1000), THREExt.material({color: 0x6060ff}));
	ocean.position = new THREE.Vector3(0, 0, -10);
	SceneContainer.addToScene(ocean);
};

AreaDirector.prototype.addSunAndMoon = function() {
	var sunLight = new THREE.PointLight(0xffe993);
	sunLight.totalElapsedTime = 0;

	sunLight.animate = function(self, ms) {
		self.totalElapsedTime += ms;
		self.position = new THREE.Vector3(
			0,
			AreaDirector.sunDistance * Math.sin(self.totalElapsedTime * AreaDirector.sunSpeed),
			AreaDirector.sunDistance * Math.cos(self.totalElapsedTime * AreaDirector.sunSpeed)
		);
	};

	var moonLight = new THREE.PointLight(0x404252);
	moonLight.totalElapsedTime = 0;

	moonLight.animate = function(self, ms) {
		self.totalElapsedTime += ms;
		self.position = new THREE.Vector3(
			0,
			-AreaDirector.sunDistance * Math.sin(self.totalElapsedTime * AreaDirector.sunSpeed),
			-AreaDirector.sunDistance * Math.cos(self.totalElapsedTime * AreaDirector.sunSpeed)
		);
	};

	SceneContainer.addToScene(sunLight);
	SceneContainer.addToScene(moonLight);
};

AreaDirector.prototype.addSky = function() {
	var material = THREExt.material({image: "sky/posx.jpg", color: 0x8080ff});
	material.side = THREE.BackSide;
	SceneContainer.addToScene(new THREE.Mesh(new THREE.CubeGeometry(100000, 100000, 100000), material));};

AreaDirector.prototype.locationsLoaded = function(locations) {
	$.each(locations, function(index, l) {
		var lType = StaticData.locationTypes[l.locationTypeId];
		THREExt.loadMeshAsync({path: "location/" + lType.canonicalName + ".dae", x: 10 * l.coordinatesX, y: 10 * l.coordinatesY, properties: {mouseVisible: true, tooltip: lType.name}}); 
	});
};
