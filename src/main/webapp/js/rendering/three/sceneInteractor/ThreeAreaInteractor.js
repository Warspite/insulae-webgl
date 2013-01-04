var ThreeAreaInteractor = {
	scene: null,
	
	setup: function(scene) {
		ThreeAreaInteractor.scene = scene;
	},
	
	hover: function(o) {
		ThreeAreaViewer.highlight(o);
	},
	
	click: function(o) {
		console.log("Click " + o);
	}
};
