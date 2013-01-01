var Tooltip = {
	delay: 750,
	visible: false,
	element: $('#tooltip'),
	
	update: function(pointedAtObject, pointedAtObjectChangeTime) {
		var now = new Date().getTime();
		if(pointedAtObject && now - pointedAtObjectChangeTime > Tooltip.delay || pointedAtObject == Tooltip.element)
			Tooltip.showIfRequested(pointedAtObject);
		else
			Tooltip.hide();
	},
	
	showIfRequested: function(pointedAtObject) {
		if(Tooltip.visible)
			return;
			
		var msg = null;
		if(Tooltip.isObjectDomElement(pointedAtObject))
			msg = $(pointedAtObject).attr('tooltip') || null;
		else
			msg = pointedAtObject.tooltip || null;
			
		if(msg == null)
			return;
			
		Tooltip.element.css('visibility', 'visible').html(msg);
		Tooltip.element.css(Tooltip.determinePosition());
		console.log("I should show tooltip for " + pointedAtObject);
		Tooltip.visible = true;
	},
	
	hide: function() {
		if(!Tooltip.visible)
			return;
		
		console.log("I should hide tooltip.")
		
		
		Tooltip.element.css('visibility', 'collapse');
		Tooltip.visible = false;
	},
	
	determinePosition: function() {
		var p = {
			left: Mouse.instance.current.x - $('#tooltip').width() / 2, 
			top: Mouse.instance.current.y - $('#tooltip').height() - 5  
		};
		
		if(p.top < 0)
			p.top = Mouse.instance.current.y + 5;
			
		if(p.left < 0)
			p.left = 0;
			
		if(p.left + $('#tooltip').width() > $(window).width())
			p.left = $(window).width() - $('#tooltip').width(); 
		
		return p;
	},
	
	isObjectDomElement: function(o) {
		if(o.hasOwnProperty('innerHTML'))
			return true;
		else
			return false;
	}
};