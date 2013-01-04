var InputInterpreter = {
	cameraController: null,
	sceneInteractor: null,
	
	heartbeat: function(heartbeat) {
		if(InputInterpreter.cameraController)
			InputInterpreter.doCameraControl(heartbeat);
			
		if(InputInterpreter.sceneInteractor)
			InputInterpreter.doSceneInteraction(heartbeat);
	},
	
	doCameraControl: function(heartbeat) {
		if(Keyboard.down(Key.Q)) InputInterpreter.cameraController.move({up: heartbeat.tickTime, forward: 0, right: 0}); 
		if(Keyboard.down(Key.E)) InputInterpreter.cameraController.move({up: -heartbeat.tickTime, forward: 0, right: 0}); 
		if(Keyboard.down(Key.W)) InputInterpreter.cameraController.move({up: 0, forward: heartbeat.tickTime, right: 0}); 
		if(Keyboard.down(Key.S)) InputInterpreter.cameraController.move({up: 0, forward: -heartbeat.tickTime, right: 0}); 
		if(Keyboard.down(Key.A)) InputInterpreter.cameraController.move({up: 0, forward: 0, right: -heartbeat.tickTime}); 
		if(Keyboard.down(Key.D)) InputInterpreter.cameraController.move({up: 0, forward: 0, right: heartbeat.tickTime}); 
		if(Keyboard.down(Key.LEFT)) InputInterpreter.cameraController.rotate({up: 0, right: heartbeat.tickTime}); 
		if(Keyboard.down(Key.RIGHT)) InputInterpreter.cameraController.rotate({up: 0, right: -heartbeat.tickTime}); 
		if(Keyboard.down(Key.UP)) InputInterpreter.cameraController.rotate({up: -heartbeat.tickTime, right: 0}); 
		if(Keyboard.down(Key.DOWN)) InputInterpreter.cameraController.rotate({up: heartbeat.tickTime, right: 0}); 
		
		if(Mouse.mouseWheelDelta != 0) InputInterpreter.cameraController.zoom(Mouse.mouseWheelDelta * 50);
		if(Keyboard.down(Key.CTRL)) InputInterpreter.cameraController.rotate({up: Mouse.delta.y * 20, right: -Mouse.delta.x * 1.5});
	},
	
	doSceneInteraction: function(heartbeat) {
		if(Mouse.hoveredSceneObject != Mouse.lastHoveredSceneObject) InputInterpreter.sceneInteractor.hover(Mouse.hoveredSceneObject);
		if(Mouse.clickedSceneObject) InputInterpreter.sceneInteractor.click(Mouse.clickedSceneObject);
	}	
};