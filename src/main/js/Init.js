var Init = {
	run : function() {
		Overloads.run();
		
		Keyboard.setup();
		Mouse.setup();
		
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
