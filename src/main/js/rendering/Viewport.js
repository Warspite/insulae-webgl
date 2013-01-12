var Viewport = {
	id: 'viewport',
	sceneContent: null,
	renderer: null,
	lastRenderCycle: new Date().getTime(),
	
	$: function() {
		return $('#' + Viewport.id);
	},
	
	setup: function() {
		
	},
	
	setRenderer: function(renderer) {
		Viewport.renderer = renderer;
		Viewport.renderer.setup(Viewport.$());
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
		
		var viewportSize = {width: Viewport.$().width(), height: Viewport.$().height()};
		var wantedSize = {width: window.innerWidth, height: window.innerHeight - Widget.$(TopBarWidget).height()};
		
		if(params.forced || viewportSize.width != wantedSize.width || viewportSize.height != wantedSize.height) {
			Viewport.$().css(wantedSize);
			Viewport.$().width(50);
			Viewport.$().height(50);
			Viewport.renderer.resize(wantedSize);
		}
	},
	
	getSceneObjectAtWindowCoordinates: function(coordinates) {
		if(!Viewport.renderer || !Viewport.sceneContent)
			return null;
		
		var viewportCoordinates = {x: coordinates.x - Viewport.$().position().left, y: coordinates.y - Viewport.$().position().top};
		return Viewport.renderer.getSceneObjectAtCoordinates(viewportCoordinates);
		
		
	},
};
