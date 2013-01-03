var Mouse = {
	heldThreshold: 300,
	draggedThreshold: 10,
	elementDown: {},
	current: {x: 0, y: 0},
	delta: {x: 0, y: 0},
	lastDown: {x: 0, y: 0},
	lastUp: {x: 0, y: 0},
	dragDelta: {x: 0, y: 0},
	mouseWheelDelta: 0,
	
	hoveredDomElement: null,
	hoveredSceneObject: null,
	
	setup: function(elements) {
		$('.mouseVisible').live('mouseenter', function(e) { Mouse.hoveredDomElement = this; });
		$('.mouseVisible').live('mouseleave', function(e) { if(this == Mouse.hoveredDomElement) Mouse.hoveredDomElement = null; });
		$('.mouseVisible').mousedown(Mouse.downEvent);
		$('*').mouseup(Mouse.upEvent);
		$(document).live('mousemove', Mouse.moveEvent);
		$(window).mousewheel(Mouse.mousewheelEvent);
	},
	
	downEvent: function(e) {
		Mouse.elementDown = {};
		Mouse.elementDown[this.id] = new Date().getTime();
		Mouse.lastDown = {x: e.pageX, y: e.pageY};
		Mouse.dragDelta = {x: 0, y: 0};
	},
	
	upEvent: function(e) {
		Mouse.elementDown = {};
		Mouse.lastUp = {x: e.pageX, y: e.pageY};
	},
	
	moveEvent: function(e) {
		Mouse.delta = {x: Mouse.current.x - e.pageX, y: Mouse.current.y - e.pageY};
		Mouse.current = {x: e.pageX, y: e.pageY};
		Mouse.dragDelta = {x: Mouse.current.x - Mouse.lastDown.x, y: Mouse.current.y - Mouse.lastDown.y};
	},
	
	mousewheelEvent: function(event, delta) {
		Mouse.mouseWheelDelta += delta;
	},
	
	down: function(elementId) {
		if(Mouse.elementDown[elementId])
			return true;
			
		return false;
	},
	
	held: function(elementId) {
		if(!Mouse.down(elementId))
			return false;
			
		return Mouse.elementDown[elementId] < new Date().getTime() - Mouse.heldThreshold;
	},

	dragged: function(elementId) {
		if(!Mouse.held(elementId))
			return false;
			
		console.log("lastDown: " + Mouse.lastDown.x + "," + Mouse.lastDown.y + ", dragDelta: " + Mouse.dragDelta.x + "," + Mouse.dragDelta.y)
		return Math.abs(Mouse.dragDelta.x) > Mouse.draggedThreshold || Math.abs(Mouse.dragDelta.y) > Mouse.draggedThreshold;
	},
	
	heartbeat: function(heartbeat) {
		Mouse.mouseWheelDelta = 0;
		Mouse.delta = {x: 0, y: 0};
	}
};
