var HtmlInit = {
	run : function() {
		CreateAvatarPopup.setup();
		CreateTroubleReport.setup();
		ErrorMessage.setup();
		Message.setup();
		RegisterAccount.setup();
		SelectAvatarPopup.setup();
		
		TopBarWidget.setup({viewport: SceneContainer});
		CurrentSessionWidget.setup();
		HelpAndTroubleReportWidget.setup();
		LoginWidget.setup();
		LoginWidget.focus();
		MinimapWidget.setup();
		
		TopBarWidget.show(LoginWidget);
		TopBarWidget.show(HelpAndTroubleReportWidget);
	}
}
