var Popup = {
	shown : null,
	
	show : function(clazz) {
		var element = $('#' + clazz.id); 
		if(Popup.shown) {
			if(Popup.shown.modal)
				return;
			else
				Popup.hide(Popup.shown);
		}
			
		element.css("visibility", "visible");
		Popup.shown = clazz;
	},
	
	hide : function(clazz) {
		var element = $('#' + clazz.id); 
		element.css("visibility", "collapse");
		if(Popup.shown == clazz)
			Popup.shown = null;
	}
};
