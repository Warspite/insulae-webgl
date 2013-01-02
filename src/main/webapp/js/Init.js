var Init = {
	run : function() {
		Overloads.run();
		
		var keyboard = new Keyboard();
		var mouse = new Mouse();
		
		Viewport.setRenderer(ThreeRenderer);

		DynamicData.setup();
		StaticData.load({completionCallback: Init.staticDataLoaded});
		DynamicData.setup();
		
		Heartbeat.beat();
	},
	
	staticDataLoaded : function() {
		HtmlInit.run();
	},
}
