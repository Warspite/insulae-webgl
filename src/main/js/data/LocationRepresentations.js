var LocationRepresentations = function(targetNumber) {
	this.byId = {};
	this.byCoordinates = {};
	this.number = 0;
	this.targetNumber = targetNumber;
}

LocationRepresentations.prototype.add = function(representation) {
	if(!representation.data)
		throw "Invalid location representation. Expected it to contain a 'data' object, but it didn't.'";
		
	this.number++; 
	this.byId[representation.data.id] = representation; 
	
	if(!this.byCoordinates[representation.data.coordinatesX])
		this.byCoordinates[representation.data.coordinatesX] = {};
		
	this.byCoordinates[representation.data.coordinatesX][representation.data.coordinatesY] = representation;
};

LocationRepresentations.prototype.allLocationsAdded = function() {
	return this.number >= this.targetNumber;
};
