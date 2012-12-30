var CurrentSessionWidget = {
	id: 'currentSessionWidget',
	
	setup: function() {
		$("#logoutLink").click(function(event){
			CurrentSessionWidget.logout();
		});
	},
		
	logoutSucceeded: function(result, self) {
		Session.set(null);
		Session.currentAccount = null;
		
		LoginWidget.clear();
		TopBar.hideWidget(CurrentSessionWidget);
		TopBar.showWidget(LoginWidget);
	},
	
	logout: function() {
		Server.req({
			servlet: "account/Session", 
			type: "DELETE",
			successCallback: CurrentSessionWidget.logoutSucceeded});
	},
};
