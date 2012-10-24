var Init = {
	run : function() {
		var keyboard = new Keyboard();
		DynamicData.setup();
		SceneContainer.init(keyboard);
		var mouse = new Mouse();
	}
}
