var ThreeOcean = function(p){
	var params = Params.check(p, ['minX', 'maxX', 'minY', 'maxY'], {resolution: 0.2});
	
	var areaSize = {x: params.maxX - params.minX, y: params.maxY - params.minY};
	var oceanSize = {x: areaSize.x + 20, y: areaSize.y + 20};
	var origin = {x: params.minX + areaSize.x * 0.5, y: params.minY + areaSize.y * 0.5};
	var geometry = new THREE.PlaneGeometry(oceanSize.x, oceanSize.y, 1, 1);
	geometry.computeTangents();

	var shader = THREE.ShaderLib[ "normalmap" ];
	this.uniforms = THREE.UniformsUtils.clone(shader.uniforms);
	this.uniforms["enableAO"].value = false;
	this.uniforms["enableDiffuse"].value = true;
	this.uniforms["enableSpecular"].value = true;
	this.uniforms["enableReflection"].value = false;
	this.uniforms["enableDisplacement"].value = false;
	
	this.uniforms["tNormal"].value = THREE.ImageUtils.loadTexture(Paths.IMAGE_ROOT + "texture/ocean/normal.png");
	this.uniforms["tSpecular"].value = THREE.ImageUtils.loadTexture(Paths.IMAGE_ROOT + "texture/ocean/cloud.png");
	this.uniforms["tDiffuse"].value = THREE.ImageUtils.loadTexture(Paths.IMAGE_ROOT + "texture/ocean/diffuse.png");
	this.uniforms["tNormal"].value.wrapS = this.uniforms["tNormal"].value.wrapT = this.uniforms["tSpecular"].value.wrapS = this.uniforms["tSpecular"].value.wrapT = this.uniforms["tDiffuse"].value.wrapS = this.uniforms["tDiffuse"].value.wrapT = THREE.RepeatWrapping; 
	this.uniforms["uSpecularColor"].value.setHex( 0xffffff );
	this.uniforms["uRepeat"].value = {x: oceanSize.x * params.resolution, y: oceanSize.y * params.resolution}; 
	this.uniforms["uShininess"].value = 10;
	this.uniforms["uSpecularColor"].value.convertGammaToLinear();
	this.uniforms["uAmbientColor"].value.convertGammaToLinear();

				
	var material = new THREE.ShaderMaterial({
		uniforms: this.uniforms,
    	vertexShader: shader.vertexShader,
    	fragmentShader: shader.fragmentShader,
    	lights: true,
    	fog: true
  	});
		
	this.mesh = new THREE.Mesh(geometry, material);
	this.mesh.position.set(origin.x, origin.y, -0.2);
};
	
ThreeOcean.prototype.animate = function(heartbeat) {
};