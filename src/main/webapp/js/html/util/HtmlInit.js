var HtmlInit = {
	run : function() {
		CreateAvatarPopup.setup();
		CreateTroubleReport.setup();
		ErrorMessage.setup();
		Message.setup();
		RegisterAccount.setup();
		SelectAvatarPopup.setup();
		
		TopBar.setup({viewport: SceneContainer});
		CurrentSessionWidget.setup();
		HelpAndTroubleReportWidget.setup();
		LoginWidget.setup();
		LoginWidget.focus();
		
		TopBar.showWidget(LoginWidget);
		TopBar.showWidget(HelpAndTroubleReportWidget);
	}
}
