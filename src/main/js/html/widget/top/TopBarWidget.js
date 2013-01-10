var TopBarWidget = {
	id: 'topBarWidget',
	
	show: function(w) {
		Widget.show(w);
		
		$('#' + w.id).css("height", Widget.$(TopBarWidget).css("height"));
	},
	
	hide: function(w) {
		Widget.hide(w);
		
		$('#' + w.id).css("height", "0px");
	},
	
	setup: function() {
	},
	
};
