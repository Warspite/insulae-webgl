var THREExt = {
	material : function(params) {
		if (params.image) {
			return new THREE.MeshPhongMaterial({
				map : THREE.ImageUtils.loadTexture(Paths.IMAGE_ROOT + "texture/" + params.image)
			});
		}

		if (params.color) {
			return new THREE.MeshPhongMaterial({
				color : params.color
			});
		}

		return new THREE.MeshPhongMaterial({
			color : 0x808080
		});
	}
};
