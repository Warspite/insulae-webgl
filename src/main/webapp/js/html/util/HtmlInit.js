var HtmlInit = {
	run : function() {
		CreateAvatar.setup();
		CreateTroubleReport.setup();
		ErrorMessage.setup();
		Message.setup();
		RegisterAccount.setup();
		
		TopBar.setup({viewport: SceneContainer});
		CurrentSessionWidget.setup();
		HelpAndTroubleReportWidget.setup();
		LoginWidget.setup();
		LoginWidget.focus();
		
		TopBar.showWidget(LoginWidget);
		TopBar.showWidget(HelpAndTroubleReportWidget);
	}
}
