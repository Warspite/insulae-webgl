var Init = {
	run : function() {
		Overloads.run();
		
		Keyboard.setup();
		Mouse.setup();
		
		Viewport.setRenderer(ThreeRenderer);

		StaticData.load({completionCallback: Init.staticDataLoaded});
		
		Heartbeat.beat();
	},
	
	staticDataLoaded : function() {
		HtmlInit.run();
	},
}
