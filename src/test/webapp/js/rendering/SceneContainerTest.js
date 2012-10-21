var Paths = {
	IMAGE_ROOT : "../../../../main/webapp/images/",
	JAVASCRIPT_ROOT : "../../../../main/webapp/js/",
	SOUND_ROOT : "../../../../main/webapp/sound/"
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

var pointLight = null;

window.onload = function(event) {
	SceneContainer.init();

	var sphereGeometry = new THREE.SphereGeometry(50, 16, 16);
	var sphereMaterial = new THREE.MeshLambertMaterial({color: 0xCC0000});
	var sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
	
	pointLight = new THREE.PointLight(0xFFFFFF);
	pointLight.position = {x: 10, y: 50, z: 130};
	
	SceneContainer.addToScene(sphereMesh);
	SceneContainer.addToScene(pointLight);
	
	animate();};

function animate() {
	requestAnimFrame(animate);

	pointLight.position.x += 1;
	
	if(pointLight.position.x > 300)
		SceneContainer.clearScene();
}
