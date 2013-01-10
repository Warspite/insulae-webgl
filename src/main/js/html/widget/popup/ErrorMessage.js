var ErrorMessage = {
	modal : true,
	
	id: 'errorMessage',
	
	setup: function() {
		$("#errorDismissLink").click(function(event){
			Popup.hide(ErrorMessage);
		});

		$("#errorReportLink").click(function(event){
			CreateTroubleReport.clear();
			CreateTroubleReport.populate({troubleReportTypeId: 2, slogan: "GUI Error popup", content: "[Please describe the circumstances that led to the error here.]\n\n---Automatically generated message below---" + $('#errorContent').html()});
			Popup.hide(ErrorMessage);
			Popup.show(CreateTroubleReport);
		});
	},
	
	display: function(msg) {
		$('#errorContent').html(msg);
		Popup.show(ErrorMessage);
	},
};
