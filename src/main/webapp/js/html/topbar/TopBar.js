var TopBar = {
	id: 'topBar',
	
	showWidget: function(clazz) {
		$('#' + clazz.id).css("height", $("#" + TopBar.id).css("height"));
		$('#' + clazz.id).css("visibility", "visible");
	},
	
	hideWidget: function(clazz) {
		$('#' + clazz.id).css("height", "0px");
		$('#' + clazz.id).css("visibility", "collapse");
	},
	
	setup: function(p) {
		var params = Params.check(p, ['viewport'])

		setInterval(function(){ $("#" + TopBar.id).css("width", params.viewport.getSize().width); }, 100);
	},
};
