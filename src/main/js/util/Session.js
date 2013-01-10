var Session = {
	current: null,
	avatars: null,
	currentAvatar: null,
	
	set: function(s) {
		Session.current = s;
		Session.avatars = null;
		Session.currentAvatar = null;
	},
        
	get: function() {
		return Session.current;
	}
};
