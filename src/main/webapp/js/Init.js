var Init = {
	run : function() {
		Overloads.run();
		
		var keyboard = new Keyboard();
		DynamicData.setup();
		SceneContainer.init(keyboard);
		var mouse = new Mouse();
		
		StaticData.load({completionCallback: Init.staticDataLoaded});
		DynamicData.setup();
	},
	
	staticDataLoaded : function() {
		HtmlInit.run();
	}
}
