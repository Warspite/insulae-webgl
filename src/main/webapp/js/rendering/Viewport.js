var Viewport = {
	element: $('#viewport'),
	sceneContent: null,
	renderer: null,
	lastRenderCycle: new Date().getTime(),
	
	setup: function() {
		
	},
	
	setRenderer: function(renderer) {
		Viewport.renderer = renderer;
		Viewport.renderer.setup(Viewport.element);
		Viewport.updateSize({forced: true});
		Viewport.setSceneContent(Viewport.sceneContent);
	},
	
	setSceneContent: function(sceneContent) {
		Viewport.sceneContent = sceneContent;

		if(Viewport.renderer)
			Viewport.renderer.setSceneContent(Viewport.sceneContent);
	},
	
	render : function(heartbeat) {
		Viewport.updateSize();
		
		if(Viewport.renderer) {
			Viewport.renderer.animate(heartbeat);
			Viewport.renderer.render();
		}
	},
	
	updateSize: function(p) {
		var params = Params.check(p, null, {forced: false});
		
		var viewportSize = {width: Viewport.element.width(), height: Viewport.element.height()};
		var wantedSize = {width: window.innerWidth, height: window.innerHeight - Widget.$(TopBarWidget).height()};
		
		if(params.forced || viewportSize.width != wantedSize.width || viewportSize.height != wantedSize.height) {
			Viewport.element.css(wantedSize);
			Viewport.renderer.resize(wantedSize);
		}
	},
};
