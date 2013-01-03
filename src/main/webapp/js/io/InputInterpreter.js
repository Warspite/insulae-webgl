var InputInterpreter = {
	cameraController: null,
	
	setup: function(p) {
		var params = Params.check(p, null, {keyboard: null, mouse: null});
		InputInterpreter.keyboard = params.keyboard;
		InputInterpreter.mouse = params.mouse;
	},
	
	heartbeat: function(heartbeat) {
		if(InputInterpreter.keyboard && InputInterpreter.cameraController)
			InputInterpreter.doKeyboardCameraControl(heartbeat);
			
		if(InputInterpreter.mouse && InputInterpreter.cameraController)
			InputInterpreter.doMouseCameraControl(heartbeat);
	},
	
	doKeyboardCameraControl: function(heartbeat) {
		
		if(keyboard.down(Key.Q)) InputInterpreter.cameraController.ascend(heartbeat.tickTime); 
		if(keyboard.down(Key.E)) InputInterpreter.cameraController.descend(heartbeat.tickTime); 
		if(keyboard.down(Key.W)) InputInterpreter.cameraController.moveForward(heartbeat.tickTime); 
		if(keyboard.down(Key.S)) InputInterpreter.cameraController.moveBackward(heartbeat.tickTime); 
		if(keyboard.down(Key.A)) InputInterpreter.cameraController.moveLeft(heartbeat.tickTime); 
		if(keyboard.down(Key.D)) InputInterpreter.cameraController.moveRight(heartbeat.tickTime); 
		if(keyboard.down(Key.UP)) InputInterpreter.cameraController.pitchUp(heartbeat.tickTime); 
		if(keyboard.down(Key.DOWN)) InputInterpreter.cameraController.pitchDown(heartbeat.tickTime); 
		if(keyboard.down(Key.LEFT)) InputInterpreter.cameraController.rotateLeft(heartbeat.tickTime); 
		if(keyboard.down(Key.RIGHT)) InputInterpreter.cameraController.rotateRight(heartbeat.tickTime); 
	},
	
	doMouseCameraControl: function(heartbeat) {
		
	}
};