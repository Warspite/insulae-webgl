var ThreeAreaViewer = {
	scene: null,
	hoverHighlight: new THREE.Mesh(new THREE.SphereGeometry(3.0, 16, 16), THREExt.material({color: 0xff0000})),
	
	view: function(sceneContent, scene) {
		ThreeAreaViewer.scene = scene;
		
		ThreeCameraController.reset();
		ThreeCameraController.position.setZ(300);
		
		ThreeAreaViewer.addSunAndMoon();
		ThreeAreaViewer.addSky();
		
		sceneContent.setLocationsUpdatedCallback(ThreeAreaViewer.addLocations);
	},
	
	addSunAndMoon: function() {
		ThreeAreaViewer.sunLight = new THREE.PointLight(0xffe993);
		ThreeAreaViewer.sunLight.distance = 500;
		ThreeAreaViewer.sunLight.speed = 0.0001;
	
		ThreeAreaViewer.moonLight = new THREE.PointLight(0x404252);
		ThreeAreaViewer.moonLight.distance = -500;
		ThreeAreaViewer.moonLight.speed = 0.0001;
	
		ThreeAreaViewer.scene.add(ThreeAreaViewer.sunLight);
		ThreeAreaViewer.scene.add(ThreeAreaViewer.moonLight);
	},
	
	addSky: function() {
		var material = THREExt.material({image: "sky/posx.jpg", color: 0x8080ff});
		material.side = THREE.BackSide;
		ThreeAreaViewer.scene.add(new THREE.Mesh(new THREE.CubeGeometry(100000, 100000, 100000), material));
	},
	
	animate: function(heartbeat) {
		ThreeAreaViewer.animateHeavenlyBody(ThreeAreaViewer.sunLight, heartbeat);
		ThreeAreaViewer.animateHeavenlyBody(ThreeAreaViewer.moonLight, heartbeat);
	},
	
	animateHeavenlyBody: function(b, heartbeat) {
		if(b) {
			b.position.setY(b.distance * Math.sin(heartbeat.totalTime * b.speed));
			b.position.setZ(b.distance * Math.cos(heartbeat.totalTime * b.speed));
		}
	},
	
	addLocations: function(locations) {
		$.each(locations, function(index, l) {
			var lType = StaticData.locationTypes[l.locationTypeId];
			THREExt.loadMeshAsync({
				path: "location/" + lType.canonicalName + ".dae", 
				callback: function(mesh) { ThreeAreaViewer.scene.add(mesh); }, 
				x: 10 * l.coordinatesX, 
				y: 10 * l.coordinatesY, 
				properties: {mouseVisible: true, tooltip: lType.name}
			}); 
		});
	},
	
	highlight: function(o) {
		if(!ThreeAreaViewer.hoverHighlight)
			return;
			
		if(!o) {
			if(ThreeAreaViewer.hoverHighlight.parent) {
				ThreeAreaViewer.hoverHighlight.parent.remove(ThreeAreaViewer.hoverHighlight);
			}
		}
		else {
			if(!ThreeAreaViewer.hoverHighlight.parent) {
				ThreeRenderer.scene.add(ThreeAreaViewer.hoverHighlight);
			}
			new TWEEN.Tween( ThreeAreaViewer.hoverHighlight.position ).to( {x: o.position.x, y: o.position.y, z: o.position.y + 8}, 200 ).easing( TWEEN.Easing.Sinusoidal.InOut ).start();
		}
	},
};
