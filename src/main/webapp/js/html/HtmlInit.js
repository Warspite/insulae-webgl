var HtmlInit = {
	run : function() {
		CreateAvatar.setup();
		CreateTroubleReport.setup();
		ErrorMessage.setup();
		MenuBar.setup({viewport: SceneContainer});
		Message.setup();
		RegisterAccount.setup();
	}
}
