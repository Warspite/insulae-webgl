var Mouse = function()
{
	mixin(new EventDispatcher(), this);
	
	this.mousePressed = false;
	this.mouseDown = false;
	this.mouseReleased = false;
	this.mouseScrolled = false;
	
	this.hoveredDomElement = null;
	this.pointedAtObject = null
	this.lastPointedAtObject = null;
	this.pointedAtObjectChangeTime = 0; 

	this.current = {x: 0, y: 0};
	this.lastDown = {x: 0, y: 0};
	this.lastUp = {x: 0, y: 0};
	this.wheelDelta = 0;
	
	this.projector = new THREE.Projector();
	
	this.hoverHighlight = new THREE.PointLight(0xffffff, 0, 200);
	SceneContainer.scene.add(this.hoverHighlight);
	
	Mouse.instance = this;
	$('*').live('mouseenter', function(e) { if($(this).attr('mouseVisible')) Mouse.instance.hoveredDomElement = this; });
	$('*').live('mouseleave', function(e) { if(this == Mouse.instance.hoveredDomElement) Mouse.instance.hoveredDomElement = null; });
	$(document).live('mousemove', function(e) { Mouse.instance.current = {x: e.pageX, y: e.pageY};});
	
	SceneContainer.domElement.addEventListener("mousedown", function(e){ Mouse.instance.mouseEventHandler(e); }, false);
	SceneContainer.domElement.addEventListener("mouseup", function(e){ Mouse.instance.mouseEventHandler(e); }, false);
	SceneContainer.domElement.addEventListener("DOMMouseScroll", function(e){ Mouse.instance.mouseScrollHandler(e); }, false);
	SceneContainer.domElement.addEventListener("mousewheel", function(e){ Mouse.instance.mouseScrollHandler(e); }, false);
	this.timeOfLastTick = new Date().getTime();
	Mouse.instance.tick();
};

Mouse.prototype.sceneCoordinates = function() {
	var scenePosition = SceneContainer.jqElement.position();
	return {x: this.current.x - scenePosition.left, y: this.current.y - scenePosition.top};
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

	var mouse = this;
	var func = mouse[e.type];
	if( func )
		func(mouse, e);
};

Mouse.prototype.mouseup = function(self, e)
{
	self.mouseReleased = true;
	self.lastUp = self.current;
};

Mouse.prototype.mousedown = function(self, e, x, y)
{
	self.mousePressed = true;
	self.lastDown = self.current;
};

Mouse.prototype.tick = function()
{
	var self = Mouse.instance;
	var now = new Date().getTime();
	var elapsedTime = now - self.timeOfLastTick;
	self.timeOfLastTick = now;
	
	if( !self.mouseScrolled ) {
		self.wheelDelta = 0;
	}
	else {
		self.dispatchEvent(EventType.MOUSE_WHEEL, self.wheelDelta);
	}
	
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
	
	if(this.hoveredDomElement != null) {
		this.pointedAtObject = this.hoveredDomElement;
	}
	else {
		this.pointedAtObject = this.getPointedAtSceneObject();
		this.highlightHoveredObject();
	}
	
	if(this.pointedAtObject != this.lastPointedAtObject)
		this.pointedAtObjectChangeTime = new Date().getTime();
		
	Tooltip.update(this.pointedAtObject, this.pointedAtObjectChangeTime);
};

Mouse.prototype.getPointedAtSceneObject = function() {
	var sceneCoordinates = this.sceneCoordinates();
	var mouse2dCoordinates = new THREE.Vector3(
		(sceneCoordinates.x / SceneContainer.renderer.context.drawingBufferWidth) * 2 - 1,
		-(sceneCoordinates.y / SceneContainer.renderer.context.drawingBufferHeight) * 2 + 1,
		0.5);
	
	var mouse3dCoordinates = this.projector.unprojectVector(mouse2dCoordinates, SceneContainer.camera);
	var mouseRaycaster = new THREE.Raycaster(SceneContainer.camera.position, mouse3dCoordinates.subSelf(SceneContainer.camera.position).normalize());
	var intersectedMeshes = mouseRaycaster.intersectObjects(SceneContainer.getAllMeshes());
	
	for(i in intersectedMeshes) {
		var mesh = intersectedMeshes[i].object;
		var o = mesh.sceneObjectAncestor || mesh;
		if(o.mouseVisible)
			return o;
	}
	
	return null;
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
