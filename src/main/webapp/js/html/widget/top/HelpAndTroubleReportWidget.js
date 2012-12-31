var HelpAndTroubleReportWidget = {
	id: 'helpAndTroubleReportWidget',
	
	setup: function() {
		$("#createTroubleReportLink").click(function(event){
			CreateTroubleReport.clear();
			Popup.show(CreateTroubleReport);
		});
	},
};
