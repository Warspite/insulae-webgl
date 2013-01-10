var Server = {
	req: function(p) {
		var params = Params.check(p, ['servlet', 'successCallback'], {type: 'GET', params: null, failureCallback: Server.defaultFailureCallback, callerObject: null});
		
		console.log("Making call to " + params.servlet + " with session: " + JSON.stringify(Session.current) + " and parameters " + JSON.stringify(params.params));
		
		$.ajax({
			url: "api/" + params.servlet,
			dataType: "json",
			headers: {
				"params": JSON.stringify(params.params),
				"auth": JSON.stringify(Session.current)
			},
			error: Server.handleRequestFault,
			success: function(result) {
				if( result.success )
					params.successCallback(result, params.callerObject)
				else
					params.failureCallback(result, params.type, params.servlet, params.callerObject)
			},
			type: params.type
		});
	},
	
	defaultFailureCallback: function(result, requestType, servlet) {
		alert(requestType + " request to " + servlet + " failed: " + result.message);
	},
	
    handleRequestFault: function(error, textStatus) {
    	alert("Server request error: " + error.status + " " + error.statusText + " (" + textStatus  + ")");
    },
    
    mapify: function(array, idParamName) {
    	var idParam = idParamName || "id";
    	map = {};
    	for(i in array)
    		map[array[i][idParam]] = array[i];
    	
    	return map;
    }
};
