var SelectAvatarPopup = {
	id: 'selectAvatarPopup',
	
	setup: function() {
		$('#cancelSelectAvatarLink').click(function(event){
			Popup.hide(SelectAvatarPopup);
		});
		
		$('#selectAvatarBox').change(SelectAvatarPopup.avatarSelectionChanged);
	},
	
	avatarSelectionChanged: function(s) {
		SelectAvatarPopup.evaluateForm();
	},
	
	select: function(avatarId) {
		Popup.hide(SelectAvatarPopup);
		CurrentSessionWidget.avatarSelected(Session.avatars[avatarId]);
	},
	
	evaluateForm: function() {
		var formOk = true;

		if(!$("#selectAvatarBox").val())
			formOk = false;
			
		$("#selectAvatarButton").off('click.selectAvatar');
		if( formOk ) {
			$("#selectAvatarButton").on('click.selectAvatar', function(event){ SelectAvatarPopup.select(parseInt($('#selectAvatarBox').val())) });
			$("#selectAvatarButton").removeClass('disabled');
		}
		else {
			$("#selectAvatarButton").addClass('disabled');
		}
	
		return formOk;
	},
	
	updateSelectionBox: function() {
		$('#selectAvatarBox').empty();
		$.each(Session.avatars, function(index, avatar) {
			$('#selectAvatarBox').append(
				$('<option></option>').val(avatar.id).html(avatar.name + '(' + StaticData.realms[avatar.realmId].name + ')')
			);
		});
		
		if(Session.currentAvatar)
			$("#selectAvatarBox").val(Session.currentAvatar.id);
		else
			$("#selectAvatarBox").change();
	}
};
