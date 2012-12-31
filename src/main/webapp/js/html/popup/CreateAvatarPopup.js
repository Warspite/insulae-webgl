var CreateAvatarPopup = {
	id: 'createAvatarPopup',
	
	textFields: [
		{id: '#createAvatarName', minLength: 4}
	],

	setup: function() {
		$(".createAvatarInputField").keyup(function(event){
			if(event.keyCode == 13) {
				$("#createAvatarButton").click();
				$("#" + event.currentTarget.id).blur();
			}
			else {
				CreateAvatarPopup.evaluateForm();
			}
					
		});
		
		$("#cancelCreateAvatarLink").click(function(event){
			Popup.hide(CreateAvatarPopup);
		});
		
		$.each(StaticData.realms, function(index, realm) {
			$('#createAvatarRealm').append(
				$('<option></option>').val(realm.id).html(realm.name)
			);
		});

		$('#createAvatarRace').change(CreateAvatarPopup.raceSelectionChanged);
		$('#createAvatarRealm').change(CreateAvatarPopup.realmSelectionChanged);
		$('#createAvatarRealm').change();
	},
	
	clear: function() {
		FormUtility.clear(CreateAvatarPopup.textFields);
	},
	
	create: function(name, realmId, raceId, sexId) {
		Server.req({
			servlet: "world/Avatar", 
			type: "PUT", 
			params: {name: name, realmId: realmId, raceId: raceId, sexId: sexId}, 
			successCallback: CreateAvatarPopup.creationSucceeded});
	},
	
	evaluateForm: function() {
		var formOk = true;
		
		for(i in CreateAvatarPopup.textFields)
			if(!FormUtility.evaluateTextField(CreateAvatarPopup.textFields[i]))
				formOk = false;

		$("#createAvatarButton").off('click.createAvatar');
		if( formOk ) {
			$("#createAvatarButton").on('click.createAvatar', function(event){ CreateAvatarPopup.create($('#createAvatarName').val(), parseInt($('#createAvatarRealm').val()), parseInt($('#createAvatarRace').val()), parseInt($('#createAvatarSex').val())); });
			$("#createAvatarButton").removeClass('disabled');
		}
		else {
			$("#createAvatarButton").addClass('disabled');
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
	
	creationSucceeded: function(result) {
		console.log('Created avatar!');
		Popup.hide(CreateAvatarPopup);
		Server.req({
			servlet: 'world/Avatar',
			params: { 'accountId': Session.currentAccount.id },
			successCallback: CurrentSessionWidget.avatarsLoaded});
		CurrentSessionWidget.avatarSelected(result.content);
	},
	
	realmSelectionChanged: function() {
		$('#createAvatarRace').attr('disabled', 'disabled');
		$('#createAvatarRace').empty();
		$('#createAvatarRaceAjaxSpinner').css('visibility', 'visible');
		Server.req({
			servlet: "world/Race", 
			params: {realmId: parseInt($('#createAvatarRealm').val())}, 
			successCallback: CreateAvatarPopup.racesByRealmLoaded});
	},
	
	raceSelectionChanged: function() {
		$('#createAvatarSex').attr('disabled', 'disabled');
		$('#createAvatarSex').empty();
		$('#createAvatarSexAjaxSpinner').css('visibility', 'visible');
		Server.req({
			servlet: "world/Sex", 
			params: {raceId: parseInt($('#createAvatarRace').val())},
			successCallback: CreateAvatarPopup.sexesByRaceLoaded});
	},
	
	racesByRealmLoaded: function(result) {
		$.each(result.content.races, function(index, race) {
			$('#createAvatarRace').append(
				$('<option></option>').val(race.id).html(race.name)
			);
		});
		$('#createAvatarRace').removeAttr('disabled');
		$('#createAvatarRaceAjaxSpinner').css('visibility', 'collapse');
		$('#createAvatarRace').change();
	},

	sexesByRaceLoaded: function(result) {
		$.each(result.content.sexes, function(index, sex) {
			$('#createAvatarSex').append(
				$('<option></option>').val(sex.id).html(sex.name)
			);
		});
		$('#createAvatarSex').removeAttr('disabled');
		$('#createAvatarSexAjaxSpinner').css('visibility', 'collapse');
	},
};
