var LoginWidget = {
	id: 'loginWidget',
	
	focus: function() {
		$("#loginEmail").focus();
	},
	
	clear: function() {
		$('#loginEmail').val('');
		$('#loginPassword').val('');
	},
	
	setup: function() {
		$(".loginInputField").keyup(function(event){
			if(event.keyCode == 13) {
				$("#loginButton").click();
				$("#" + event.currentTarget.id).blur();
			}
		});
		
		$("#loginButton").click(function(event){
			LoginWidget.login($('#loginEmail').val(), $('#loginPassword').val());
		});

		$("#createAccountLink").click(function(event){
			RegisterAccount.clear();
			Popup.show(RegisterAccount);
		});
	},
		
	login: function(email, password) {
		Server.req({
			servlet: "account/Session", 
			type: "PUT", 
			params: { "email": email, "password": password }, 
			successCallback: LoginWidget.loginSucceeded, 
			failureCallback: LoginWidget.loginFailed});
	},
	
	loginSucceeded: function(result, self) {
		Session.set({id: result.content.id, key: result.content.key});
		TopBar.hideWidget(LoginWidget);
		TopBar.showWidget(CurrentSessionWidget);
		
		Server.req({
			servlet: "account/Account", 
			params: {id: Session.get().id}, 
			successCallback: LoginWidget.loggedInAccountLoaded});
		
	},
	
	loginFailed: function(result) {
		ErrorMessage.display("<h2>Login failed:</h2><br/>" + result.message);
	},


	loggedInAccountLoaded: function(result) {
		Session.currentAccount = result.content;
		$('#currentSessionWelcome').html('Welcome, ' + Session.currentAccount.givenName + '!');
	}
};
