var Message = {
	modal: true,
	
	id: 'message',
	
	setup: function() {
		$("#messageDismissLink").click(function(event){
			Popup.hide(Message);
		});
	},
	
	display: function(title, body) {
		$('#messageTitle').html(title);
		$('#messageBody').html(body);
		Popup.show(Message);
	},
};
