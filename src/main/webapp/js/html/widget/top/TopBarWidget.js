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
	
	setup: function(p) {
		var params = Params.check(p, ['viewport'])

		setInterval(function(){ $("#" + TopBarWidget.id).css("width", params.viewport.getSize().width); }, 100);
	},
	
};
