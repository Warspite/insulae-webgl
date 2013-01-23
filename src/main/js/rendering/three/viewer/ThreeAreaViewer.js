var ThreeAreaViewer = {
	scene: null,
	hoverHighlight: new THREE.Mesh(new THREE.SphereGeometry(0.3, 16, 16), THREExt.material({color: 0xff0000})),
	
	view: function(sceneContent, scene) {
		ThreeAreaViewer.scene = scene;
		
		ThreeCameraController.reset();
		ThreeCameraController.position.setZ(10);
		
		ThreeAreaViewer.addSunAndMoon();
		ThreeAreaViewer.addSky();
		
		sceneContent.setLocationsUpdatedCallback(ThreeAreaViewer.addLocations);
	},
	
	addSunAndMoon: function() {
		ThreeAreaViewer.sunLight = new THREE.PointLight(0xffe993);
		ThreeAreaViewer.sunLight.radius = 100;
		ThreeAreaViewer.sunLight.speed = 0.0001;
	
		ThreeAreaViewer.moonLight = new THREE.PointLight(0x404252);
		ThreeAreaViewer.moonLight.radius = -100;
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
			b.position.setY(b.radius * Math.sin(heartbeat.totalTime * b.speed));
			b.position.setZ(b.radius * Math.cos(heartbeat.totalTime * b.speed));
		}
	},
	
	addLocations: function(locations) {
		console.log("Received " + locations.length + " locations.");
		$.each(locations, function(index, l) {
			var lType = StaticData.locationTypes[l.locationTypeId];
			THREExt.loadSceneAsync({
				path: "location/" + lType.canonicalName, 
				callback: function(mesh) { ThreeAreaViewer.scene.add(mesh); }, 
				x: l.coordinatesX, 
				y: l.coordinatesY,
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
			new TWEEN.Tween( ThreeAreaViewer.hoverHighlight.position ).to( {x: o.position.x, y: o.position.y, z: o.position.z + 0.7}, 200 ).easing( TWEEN.Easing.Sinusoidal.InOut ).start();
		}
	},
};
