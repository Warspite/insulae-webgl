var Tooltip = {
	delay: 750,
	visible: false,
	element: $('#tooltip'),
	
	heartbeat: function(heartbeat) {
		var now = new Date().getTime();
		var tooltipShown = Tooltip.showForAnyDomElement(now);
		
		if(!tooltipShown)
			tooltipShown = Tooltip.showForAnySceneObject(now);
			
		
		if(!tooltipShown)
			Tooltip.hide();
	},
	
	showForAnyDomElement: function(now) {
		var tooltipShown = false;
		$.each(Mouse.hoveredDomElement, function(id, t) {
			if(!t)
				return;
				
			var selector = $('#' + id)
			
			if(!Tooltip.domElementHasTooltip(selector))
				return;
				
			if(now - Tooltip.delay > t) {
				Tooltip.show(selector.attr('tooltip'));
				tooltipShown = true;
			}
		});
		
		return tooltipShown;
	},
	
	showForAnySceneObject: function(now) {
		if(Tooltip.sceneObjectHasTooltip(Mouse.hoveredSceneObject) && now - Tooltip.delay > Mouse.hoveredSceneObjectChangeTime) {
			Tooltip.show(Mouse.hoveredSceneObject.tooltip);
			return true;
		}
		
		return false;
	},
	
	show: function(msg) {
		if(Tooltip.visible || !msg)
			return;

		Tooltip.element.css('visibility', 'visible').html(msg);
		Tooltip.element.css(Tooltip.determinePosition());
		Tooltip.visible = true;
	},
	
	hide: function() {
		if(!Tooltip.visible)
			return;
		
		Tooltip.element.css('visibility', 'collapse');
		Tooltip.visible = false;
	},
	
	determinePosition: function() {
		var p = {
			left: Mouse.current.x - Tooltip.element.width() / 2, 
			top: Mouse.current.y - Tooltip.element.height() - 25  
		};
		
		if(p.top < 0)
			p.top = Mouse.current.y + 5;
			
		if(p.left < 0)
			p.left = 0;
			
		if(p.left + Tooltip.element.width() > $(window).width())
			p.left = $(window).width() - Tooltip.element.width(); 
		
		return p;
	},
	
	domElementHasTooltip: function(selector) {
		if(selector && selector.attr('tooltip'))
			return true;
			
		return false;
	},
	
	sceneObjectHasTooltip: function(o) {
		if(o && o.tooltip)
			return true;
			
		return false;	
	}
};