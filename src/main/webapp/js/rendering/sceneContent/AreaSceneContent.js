var AreaSceneContent = function(area) {
	this.type = 'area';
	this.locationsUpdatedCallback = null;
	this.locations = null;
	
	Server.req({
		servlet: "geography/Location",
		params: {areaId: area.id},
		successCallback: this.locationsLoaded,
		callerObject: this
	});
};

AreaSceneContent.prototype.locationsLoaded = function(result, self) {
	self.locations = result.content.locations; 
	
	if(self.locationsUpdatedCallback)
		self.locationsUpdatedCallback(self.locations);
};

AreaSceneContent.prototype.setLocationsUpdatedCallback = function(callback) {
	this.locationsUpdatedCallback = callback;
	
	if(this.locations)
		this.locationsUpdatedCallback(this.locations);
};
