var CurrentSessionWidget = {
	id: 'currentSessionWidget',
	
	setup: function() {
		$("#logoutLink").click(function(event){
			CurrentSessionWidget.logout();
		});

		$("#openCreateAvatarLink").click(function(event){
			Popup.show(CreateAvatarPopup);
		});

		$("#openSelectAvatarLink").click(function(event){
			Popup.show(SelectAvatarPopup);
		});
	},
		
	logoutSucceeded: function(result, self) {
		Session.set(null);
		
		LoginWidget.clear();
		TopBar.hideWidget(CurrentSessionWidget);		TopBar.showWidget(LoginWidget);
	},
	
	logout: function() {
		Server.req({
			servlet: "account/Session", 
			type: "DELETE",
			successCallback: CurrentSessionWidget.logoutSucceeded});
	},
	
	avatarsLoaded: function(result) {
		Session.avatars = Server.mapify(result.content.avatars);
		CurrentSessionWidget.updateAvatarManagementLink();
		SelectAvatarPopup.updateSelectionBox();

		if(size(Session.avatars) == 0) {
			Popup.show(CreateAvatarPopup);
		}
		else if(!Session.currentAvatar) {
			Popup.show(SelectAvatarPopup);
		}
	},
	
	updateAvatarManagementLink: function() {
		if(Session.avatars.length == 0) {
			$('#openSelectAvatarLink').css('visibility', 'collapse');
		}
		else {
			$('#openSelectAvatarLink').css('visibility', 'inherit');
		}
	},
	
	avatarSelected: function(avatar) {
		Session.currentAvatar = avatar;
		console.log('Avatar selected: ' + avatar.name);
	}
};
