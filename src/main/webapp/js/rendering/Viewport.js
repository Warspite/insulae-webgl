var Viewport = {
	element: $('#viewport'),
	actorManager: null,
	renderer: null,
	lastRenderCycle: new Date().getTime(),
	
	setup: function() {
		
	},
	
	setRenderer: function(renderer) {
		Viewport.renderer = renderer;
		Viewport.renderer.setup(Viewport.element);
		Viewport.updateSize({forced: true});
		Viewport.setActorManager(Viewport.actorManager);
	},
	
	setActorManager: function(actorManager) {
		Viewport.actorManager = actorManager;

		if(Viewport.renderer)
			Viewport.renderer.setActorManager(Viewport.actorManager);
	},
	
	render : function(elapsedTime) {
		Viewport.updateSize();
		
		if(Viewport.actorManager)
			Viewport.actorManager.animate(elapsedTime);
		
		if(Viewport.renderer)
			Viewport.renderer.render();
	},
	
	updateSize: function(p) {
		var params = Params.check(p, null, {forced: false});
		
		var viewportSize = {width: Viewport.element.width(), height: Viewport.element.height()};
		var windowSize = {width: window.innerWidth, height: window.innerHeight};
		
		if(params.forced || viewportSize.width != windowSize.width || viewportSize.height != windowSize.height) {
			Viewport.element.css(windowSize);
			Viewport.renderer.resize(windowSize);
		}
	},
};
