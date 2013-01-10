var Popup = {
	shown : null,
	
	show : function(w) {
		if(Popup.shown) {
			if(Popup.shown.modal)
				return;
			else
				Popup.hide(Popup.shown);
		}
			
		Widget.show(w);
		Popup.shown = w;
	},
	
	hide : function(w) {
		Widget.hide(w);
		if(Popup.shown == w)
			Popup.shown = null;
	}
};
