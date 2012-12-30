var ErrorMessage = {
	setup: function() {
		$("#errorDismissLink").click(function(event){
			ErrorMessage.hide();
		});

		$("#errorReportLink").click(function(event){
			CreateTroubleReport.clear();
			CreateTroubleReport.show({troubleReportTypeId: 2, slogan: "GUI Error popup", content: "[Please describe the circumstances that led to the error here.]\n\n" + $('#errorMessage').html()});
			ErrorMessage.hide();
		});
	},
	
	setMessage: function(msg) {
		$('#errorMessage').html(msg);
	},
	
	show: function() {
		$('#errorMessage').css("visibility", "visible");
	},
	
	hide: function() {
		$('#errorMessage').css("visibility", "collapse");
	},
};
