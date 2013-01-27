var ThreeAreaViewer = {
	scene: null,
	locationMeshes: new LocationRepresentations(0),
	hoverHighlight: new THREE.Mesh(new THREE.SphereGeometry(0.3, 16, 16), THREExt.material({color: 0xff0000})),
	
	view: function(sceneContent, scene) {
		ThreeAreaViewer.scene = scene;
		ThreeAreaViewer.ocean = null;
		
		ThreeCameraController.reset();
		ThreeCameraController.position.setZ(10);
		
		ThreeAreaViewer.addSunAndMoon();
		ThreeAreaViewer.addCameraLight();
		
		sceneContent.setLocationsUpdatedCallback(ThreeAreaViewer.addLocations);
		
		ProgressPopup.display();
		ProgressPopup.reportProgress("Retrieving scene");
	},
	
	addCameraLight: function() {
		ThreeAreaViewer.cameraLight = new THREE.PointLight(0x808040);
		ThreeAreaViewer.cameraLight.position = ThreeCameraController.position;
		ThreeAreaViewer.cameraLight.distance = 15.0;
		ThreeAreaViewer.scene.add(ThreeAreaViewer.cameraLight);
	},
	
	addSunAndMoon: function() {
		ThreeAreaViewer.sunLight = new THREE.PointLight(0xffe993);
		ThreeAreaViewer.sunLight.radius = 100;
		ThreeAreaViewer.sunLight.speed = 0.0005;
	
		ThreeAreaViewer.moonLight = new THREE.PointLight(0x404252);
		ThreeAreaViewer.moonLight.radius = -100;
		ThreeAreaViewer.moonLight.speed = 0.0005;
	
		ThreeAreaViewer.scene.add(ThreeAreaViewer.sunLight);
		ThreeAreaViewer.scene.add(ThreeAreaViewer.moonLight);
	},
	
	addOcean: function(locationMeshes) {
		ThreeAreaViewer.ocean = new ThreeOcean(locationMeshes.boundaries);
		ThreeAreaViewer.scene.add(ThreeAreaViewer.ocean.mesh);
	},
	
	animate: function(heartbeat) {
		ThreeAreaViewer.animateHeavenlyBody(ThreeAreaViewer.sunLight, heartbeat);
		ThreeAreaViewer.animateHeavenlyBody(ThreeAreaViewer.moonLight, heartbeat);
		if(ThreeAreaViewer.ocean)
			ThreeAreaViewer.ocean.animate(heartbeat);
	},
	
	animateHeavenlyBody: function(b, heartbeat) {
		if(b)
			b.position.set(0.0, b.radius * Math.sin(heartbeat.totalTime * b.speed), b.radius * Math.cos(heartbeat.totalTime * b.speed));
	},
	
	addLocations: function(locations) {
		ProgressPopup.reportProgress("Locations retrieved");
		ThreeAreaViewer.locationMeshes = new LocationRepresentations(locations.length);
		ProgressPopup.reportProgress("Adding locations to scene");
		$.each(locations, function(index, l) {
			var lType = StaticData.locationTypes[l.locationTypeId];
			THREExt.loadSceneAsync({
				path: "location/" + lType.canonicalName, 
				callback: function(mesh) { ThreeAreaViewer.addLocationMesh(mesh); }, 
				x: l.coordinatesX, 
				y: l.coordinatesY,
				properties: {mouseVisible: true, tooltip: lType.name, data: l}
			}); 
		});
	},
	
	addLocationMesh: function(mesh) {
		if(mesh.data.road) {
			console.log("Road! " + mesh.data.coordinatesX + "," + mesh.data.coordinatesY);
		 	$.each(mesh.children, function(index, c) {
//				c.frustumCulled = false;
//				c.parent.frustumCulled = false;
//				c.material.fog = false;
				// c.material = new THREE.ShaderMaterial({vertexShader: $('#roadVertexShader').text(), fragmentShader: $('#roadFragmentShader').text()});
			});
		}
		
		ThreeAreaViewer.scene.add(mesh); 
		ThreeAreaViewer.locationMeshes.add(mesh); 
		ThreeAreaViewer.checkProgress();
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
	
	checkProgress: function() {
		if(!ThreeAreaViewer.locationMeshes.allLocationsAdded())
			return;
			
		if(!ThreeAreaViewer.ocean)
			ThreeAreaViewer.addOcean(ThreeAreaViewer.locationMeshes);

		Popup.hide(ProgressPopup);			
	},
};
