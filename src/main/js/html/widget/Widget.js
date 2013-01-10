var Widget = {
	show: function(w) {
		if(!w.id)
			throw "Missing 'id' of widget " + w;

		$('#' + w.id).css("visibility", "visible");
	},
	
	hide: function(w) {
		if(!w.id)
			throw "Missing 'id' of widget " + w;

		$('#' + w.id).css("visibility", "collapse");
	},
	
	$: function(w) {
		return $('#' + w.id);
	}
};
