var RegisterAccount = {
	id: 'registerAccount',
	
	textFields: [
   	   	{id: '#registerCallSign', minLength: 4},
   	   	{id: '#registerGivenName', minLength: 2},
   	   	{id: '#registerSurname', minLength: 2},
   	   	{id: '#registerEmail', minLength: 5},
   	   	{id: '#registerPassword', minLength: 6},
   	   	{id: '#registerPasswordConfirm'},
   	],
   	
	setup: function() {
		$(".registerInputField").keyup(function(event){
			if(event.keyCode == 13) {
				$("#registerButton").click();
				$("#" + event.currentTarget.id).blur();
			}
			else {
				RegisterAccount.evaluateForm($('#registerCallSign').val(), $('#registerGivenName').val(), $('#registerSurname').val(), $('#registerEmail').val(), $('#registerPassword').val(), $('#registerPasswordConfirm').val());
			}
					
		});
		
		$("#cancelRegisterAccountLink").click(function(event){
			Popup.hide(RegisterAccount);
		});
	},
	
	clear: function() {
		FormUtility.clear(RegisterAccount.textFields);
	},
	
	register: function(callSign, givenName, surname, email, password, passwordConfirm) {
		Server.req({
			servlet: "account/Account", 
			type: "PUT", 
			params: { email: email, password: password, surname: surname, givenName: givenName, callSign: callSign }, 
			successCallback: RegisterAccount.registrationSucceeded});
	},
	
	evaluateForm: function(callSign, givenName, surname, email, password, passwordConfirm) {
		var formOk = true;
		
		for(i in RegisterAccount.textFields)
			if(!FormUtility.evaluateTextField(RegisterAccount.textFields[i]))
				formOk = false;
	
		if( passwordConfirm != password ) {
			formOk = false;
			RegisterAccount.setFeedback('#registerPasswordConfirm', 'Passwords don\'t match!');
		}
		else {
			RegisterAccount.setFeedback('#registerPasswordConfirm', null);
		}
	
		$("#registerButton").off('click.registerAccount');
		if( formOk ) {
			$("#registerButton").on('click.registerAccount', function(event){ RegisterAccount.register($('#registerCallSign').val(), $('#registerGivenName').val(), $('#registerSurname').val(), $('#registerEmail').val(), $('#registerPassword').val(), $('#registerPasswordConfirm').val()); });
			$("#registerButton").removeClass('disabled');
		}
		else {
			$("#registerButton").addClass('disabled');
		}

		return formOk;
	},
	
	setFeedback: function(id, feedback) {
		if(feedback == null) {
			$(id).removeClass('formError');
			$(id + 'Feedback').html('Ok!');
			$(id + 'Feedback').removeClass('formErrorFeedback');
		}
		else {
			$(id).addClass('formError');
			$(id + 'Feedback').html(feedback);
			$(id + 'Feedback').addClass('formErrorFeedback');
		}
	},
	
	registrationSucceeded: function(result) {
		$('#registerAccount').css("visibility", "collapse");
		LoginWidget.login(result.content.email, $('#registerPassword').val());
	}
};
