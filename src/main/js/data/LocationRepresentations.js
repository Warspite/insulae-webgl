var LocationRepresentations = function(targetNumber) {
	this.byId = {};
	this.byCoordinates = {};
	this.number = 0;
	this.targetNumber = targetNumber;
	this.boundaries = {minX: null, maxX: null, minY: null, maxY: null};
}

LocationRepresentations.prototype.add = function(representation) {
	if(!representation.data)
		throw "Invalid location representation. Expected it to contain a 'data' object, but it didn't.'";
		
	this.number++;
	this.byId[representation.data.id] = representation; 
	
	if(!this.byCoordinates[representation.data.coordinatesX])
		this.byCoordinates[representation.data.coordinatesX] = {};
		
	this.byCoordinates[representation.data.coordinatesX][representation.data.coordinatesY] = representation;
	
	if(!this.boundaries.minX || this.boundaries.minX > representation.data.coordinatesX)
		this.boundaries.minX = representation.data.coordinatesX;

	if(!this.boundaries.maxX || this.boundaries.maxX < representation.data.coordinatesX)
		this.boundaries.maxX = representation.data.coordinatesX;

	if(!this.boundaries.minY || this.boundaries.minY > representation.data.coordinatesY)
		this.boundaries.minY = representation.data.coordinatesY;

	if(!this.boundaries.maxY || this.boundaries.maxY < representation.data.coordinatesY)
		this.boundaries.maxY = representation.data.coordinatesY;
};

LocationRepresentations.prototype.allLocationsAdded = function() {
	return this.number >= this.targetNumber;
};
