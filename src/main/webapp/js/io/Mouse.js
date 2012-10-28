var Mouse = function()
{
	mixin(new EventDispatcher(), this);
	
	this.mousePressed = false;
	this.mouseDown = false;
	this.mouseReleased = false;
	this.mouseMoved = false;
	this.mouseScrolled = false;
	this.withinBoundsOfAwareWidget = false;
	
	this.pointedAtObject = null
	this.lastPointedAtObject = null;

	this.lastMouseDownX = 0;
	this.lastMouseDownY = 0;
	this.lastMouseUpX = 0;
	this.lastMouseUpY = 0;
	this.current = {x: 0, y: 0};
	this.lastX = 0;
	this.lastY = 0;
	this.delta = {x: 0, y: 0};
	this.wheelDelta = 0;
	
	this.projector = new THREE.Projector();
	
	this.hoverHighlight = new THREE.PointLight(0xffffff, 0, 200);
	SceneContainer.scene.add(this.hoverHighlight);
	
	var self = this;
	SceneContainer.domElement.addEventListener("mousemove", function(e){ self.mouseEventHandler(e); }, false);
	SceneContainer.domElement.addEventListener("mousedown", function(e){ self.mouseEventHandler(e); }, false);
	SceneContainer.domElement.addEventListener("mouseup", function(e){ self.mouseEventHandler(e); }, false);
	SceneContainer.domElement.addEventListener("DOMMouseScroll", function(e){ self.mouseScrollHandler(e); }, false);
	SceneContainer.domElement.addEventListener("mousewheel", function(e){ self.mouseScrollHandler(e); }, false);
	
	this.timeOfLastTick = new Date().getTime();
	Mouse.instance = this;
	Mouse.instance.tick();
};


Mouse.prototype.mouseScrollHandler = function(e) {
	stopEvent(e);
	
	if ("wheelDelta" in e) {
		this.wheelDelta = e.wheelDelta;
	}
	else {  // Firefox
		// The measurement units of the detail and wheelDelta properties are different.
		this.wheelDelta = -40 * e.detail;
	}
	
	this.mouseScrolled = true;
};

Mouse.prototype.mouseEventHandler = function(e)
{
	stopEvent(e);
	var x, y;

	if (e.offsetX || e.offsetX == 0) { // Opera
		x = e.offsetX;
		y = e.offsetY;
	}
	else if (e.layerX || e.layerX == 0) { // Firefox
		x = e.pageX - SceneContainer.domElement.offsetLeft;
		y = e.pageY - SceneContainer.domElement.offsetTop;
	} 

	var mouse = this;
	var func = mouse[e.type];
	if( func )
		func(mouse, e, x, y);
};

Mouse.prototype.mousemove = function(self, e, x, y)
{
	self.current.x = x;
	self.current.y = y;
	self.mouseMoved = true;
};

Mouse.prototype.mouseup = function(self, e, x, y)
{
	self.mouseReleased = true;
	self.lastMouseUpX = x;
	self.lastMouseUpY = y;
};

Mouse.prototype.mousedown = function(self, e, x, y)
{
	self.mousePressed = true;
	self.lastMouseDownX = x;
	self.lastMouseDownY = y;
};

Mouse.prototype.tick = function()
{
	var self = Mouse.instance;
	var now = new Date().getTime();
	var elapsedTime = now - self.timeOfLastTick;
	self.timeOfLastTick = now;
	
	document.body.style.cursor = "default";
	self.withinBoundsOfAwareWidget = false;
		
	if( !self.mouseMoved ) {
		self.current.x = self.lastX;
		self.current.y = self.lastY;
	}

	if( !self.mouseScrolled ) {
		self.wheelDelta = 0;
	}
	else {
		self.dispatchEvent(EventType.MOUSE_WHEEL, self.wheelDelta);
	}
	
	self.delta.x = self.current.x - self.lastX;
	self.delta.y = self.current.y - self.lastY;

	self.lastX = self.current.x;
	self.lastY = self.current.y;

	self.mouseMoved = false;
	self.mouseScrolled = false;

	if( self.mousePressed )
		self.mouseDown = true;
	
	if( self.mouseReleased )
		self.mouseDown = false;
	
	self.updatePointedAtObject();
	
	self.mousePressed = false;
	self.mouseReleased = false;
	
	requestAnimFrame(Mouse.instance.tick);
};

Mouse.prototype.updatePointedAtObject = function() {
	this.lastPointedAtObject = this.pointedAtObject;
	this.pointedAtObject = null;
	
	var mouse2dCoordinates = new THREE.Vector3(
		(this.current.x / SceneContainer.renderer.context.drawingBufferWidth) * 2 - 1,
		-(this.current.y / SceneContainer.renderer.context.drawingBufferHeight) * 2 + 1,
		0.5);
	
	var mouse3dCoordinates = this.projector.unprojectVector(mouse2dCoordinates, SceneContainer.camera);
	var mouseRay = new THREE.Ray(SceneContainer.camera.position, mouse3dCoordinates.subSelf(SceneContainer.camera.position).normalize());
	var intersectedMeshes = mouseRay.intersectObjects(SceneContainer.getAllMeshes());
	
	for(i in intersectedMeshes) {
		var mesh = intersectedMeshes[i].object;
		var o = mesh.sceneObjectAncestor || mesh;
		if(o.mouseVisible) {
			this.pointedAtObject = o;
			break;
		}
			
	}
	
	this.highlightHoveredObject();
};

Mouse.prototype.highlightHoveredObject = function() {
	if(this.lastPointedAtObject != null && this.pointedAtObject == null) {
		new TWEEN.Tween( this.hoverHighlight ).to( { intensity: 0.0 }, 200 ).easing( TWEEN.Easing.Sinusoidal.InOut ).start();
	}
	
	if(this.pointedAtObject != null && this.pointedAtObject != this.lastPointedAtObject ) {
		new TWEEN.Tween( this.hoverHighlight ).to( { intensity: 1.0 }, 200 ).easing( TWEEN.Easing.Sinusoidal.InOut ).start();
		new TWEEN.Tween( this.hoverHighlight.position ).to( this.pointedAtObject.position, 200 ).easing( TWEEN.Easing.Sinusoidal.InOut ).start();
	}
};
