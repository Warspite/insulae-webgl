var Params = {
	check: function(inParams, requiredParams, defaultParams) {
		if(!inParams)
			throw "Received invalid parameters object.";
			
		if(requiredParams) {
			$.each(requiredParams, function(index, p) {
				if(!inParams[p])
					throw "Missing parameter '" + p + "'";
			});
		}
		
		var outParams = {};
		$.each(inParams, function(pName, pVal) {
			outParams[pName] = pVal;
		});
		
		if(defaultParams) {
			$.each(defaultParams, function(pName, pVal) {
				if(!outParams.hasOwnProperty(pName))
					outParams[pName] = pVal;
			});
		}
		
		return outParams;
    }
};
