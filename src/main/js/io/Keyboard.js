var Keyboard = {
	heldThreshold: 300,
	keysDown: {},
	
	setup: function() {
		$("body").keydown(Keyboard.downEvent);
		$("body").keyup(Keyboard.upEvent);
	},
	
	downEvent: function(event) {
		if(event.srcElement.nodeName.toLowerCase() == 'input' || event.srcElement.nodeName.toLowerCase() == 'textarea')
			return;
			
		Keyboard.keysDown[event.keyCode] = new Date().getTime();	
	},

	upEvent: function(event) {
		if(event.srcElement.nodeName.toLowerCase() == 'input' || event.srcElement.nodeName.toLowerCase() == 'textarea')
			return;
			
		Keyboard.keysDown[event.keyCode] = null;	
	},
	
	down: function(key) {
		if(Keyboard.keysDown[key.val])
			return true;
			
		return false;
	},

	held: function(key) {
		if(!Keyboard.down(key))
			return false;
			
		return Keyboard.keysDown[key.val] < new Date().getTime() - Keyboard.heldThreshold;
	},
};
