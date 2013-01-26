var ProgressPopup = {
	modal : true,
	
	id: 'progressPopup',
	progressTextId: 'progressText',
	
	setup: function() {
	},
	
	display: function() {
		$('#' + ProgressPopup.progressTextId).html('');
		Popup.show(ProgressPopup);
	},
	
	reportProgress: function(msg) {
		$('#' + ProgressPopup.progressTextId).append(msg + '...<br />');
	},
};
