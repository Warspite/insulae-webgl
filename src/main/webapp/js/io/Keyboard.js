var Keyboard = function() {
	mixin(new EventDispatcher(), this);
	this.keyDownHandler = this.keyDown.bind(this);
	this.keyPressHandler = this.keyPress.bind(this);
	this.keyUpHandler = this.keyUp.bind(this);
	document.addEventListener("keydown", this.keyDownHandler, false);
	document.addEventListener("keypress", this.keyPressHandler, false);
	document.addEventListener("keyup", this.keyUpHandler, false);

	this.keysDown = {};
	this.keysReleased = {};
	
	this.htmlNodesWithFocus = {};
	
	this.setupFocusListeners();
	
	this.keyCodes = {};
	for(i in Key)
		this.keyCodes[Key[i].val] = Key[i];

	this.holdThreshold = 280;
	this.timeOfLastTick = new Date().getTime();
	
	Keyboard.instance = this;
	Keyboard.instance.tick();
};

Keyboard.prototype.tick = function()
{
	var self = Keyboard.instance;
	var now = new Date().getTime();
	var elapsedTime = now - self.timeOfLastTick;
	self.timeOfLastTick = now;
	
	var holdThreshold = new Date().getTime() - self.holdThreshold;
	for(i = 0; i < 256; i++)
	{
		if(self.keysReleased[i])
		{
			self.keysDown[i] = null;
			self.keysReleased[i] = false;
			
			self.dispatchEvent(EventType.KEY_UP, {key: self.keyCodes[i], elapsedTime: elapsedTime});
		}
		
		if(self.keysDown[i] != null) {
			if(self.keysDown[i] > self.timeOfLastTick)
				self.dispatchEvent(EventType.KEY_PRESSED, {key: self.keyCodes[i], elapsedTime: elapsedTime});
				
			self.dispatchEvent(EventType.KEY_DOWN, {key: self.keyCodes[i], elapsedTime: elapsedTime});

			if(self.keysDown[i] < holdThreshold)
				self.dispatchEvent(EventType.KEY_HELD, {key: self.keyCodes[i], elapsedTime: elapsedTime});
		}
	}
	
	requestAnimFrame(Keyboard.instance.tick);
};

Keyboard.prototype.keyDown = function(e)
{
	if (!this.isMozilla && !e.ctrlKey && !e.altKey && !e.altKey && !e.metaKey)
	{
		this.processKey(e, e.keyCode);
	}
};

Keyboard.prototype.keyPress = function(e)
{
	if (this.isMozilla && !e.ctrlKey && !e.altKey && !e.altKey && !e.metaKey)
	{
		this.processKey(e, (e.keyCode != 0) ? e.keyCode : (e.charCode === 32) ? 32 : 0);
	}
};

Keyboard.prototype.keyUp = function(e)
{
	this.removeKey(e.keyCode);
};

Keyboard.prototype.processKey = function(e, keyCode)
{
	if( this.anyInputElementHasFocus() )
		return;

	stopEvent(e);
	this.addKey(keyCode);
};

Keyboard.prototype.addKey = function(keyCode)
{
	if(this.keysDown[keyCode] == null)
		this.keysDown[keyCode] = new Date().getTime();
};

Keyboard.prototype.removeKey = function(keyCode)
{
	this.keysReleased[keyCode] = true;
};

Keyboard.prototype.anyInputElementHasFocus = function()
{
	for(i in this.htmlNodesWithFocus)
		if(this.htmlNodesWithFocus[i])
			return true;

	return false;
};

Keyboard.prototype.isKeyDown = function(key)
{
	return this.keysDown[key.val] != null;
};

Keyboard.prototype.setupFocusListeners = function()
{
    var keyboard = this;

	$.each($("input, textarea"), function(index, e) {
    	if (e.nodeName == 'TEXTAREA' || e.type == 'text' || e.type == 'password' || e.type == 'select') {
    		e.onfocus = function() { keyboard.htmlNodesWithFocus[this.id] = true; }
    		e.onblur = function() { keyboard.htmlNodesWithFocus[this.id] = false; }
        }
	});
};
