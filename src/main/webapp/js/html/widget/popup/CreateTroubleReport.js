var CreateTroubleReport = {
	id: 'createTroubleReport',
	
	textFields: [
		{id: '#createTroubleReportSlogan', minLength: 4}
	],

	setup: function() {
		$(".createTroubleReportInputField").keyup(function(event){
			if(event.keyCode == 13) {
				$("#createTroubleReportButton").click();
				$("#" + event.currentTarget.id).blur();
			}
			else {
				CreateTroubleReport.evaluateForm();
			}
					
		});
		
		$("#cancelCreateTroubleReportLink").click(function(event){
			Popup.hide(CreateTroubleReport);
		});
		
		$.each(StaticData.troubleReportTypes, function(index, trType) {
			$('#createTroubleReportTroubleReportTypeId').append(
				$('<option></option>').val(trType.id).html(trType.name)
			);
		});
	},
	
	clear: function() {
		FormUtility.clear(CreateTroubleReport.textFields);
		$('#createTroubleReportContent').val('');
	},
	
	populate: function(p) {
		var params = Params.check(p);
		
		if(params.troubleReportTypeId)
			$('#createTroubleReportTroubleReportTypeId').val(p.troubleReportTypeId);
		
		if(params.slogan)
			$('#createTroubleReportSlogan').val(p.slogan);
		
		if(params.content)
			$('#createTroubleReportContent').val(p.content);
		
		CreateTroubleReport.evaluateForm();
	},
	
	create: function(troubleReportTypeId, slogan, content) {
		Server.req({
			servlet: "meta/TroubleReport", 
			type: "PUT", 
			params: {troubleReportTypeId: troubleReportTypeId, slogan: slogan, content: content}, 
			successCallback: CreateTroubleReport.creationSucceeded});
	},
	
	evaluateForm: function() {
		var formOk = true;
		
		$.each(CreateTroubleReport.textFields, function(index, field) {
			if(!FormUtility.evaluateTextField(field))
				formOk = false;
		});

		$("#createTroubleReportButton").off('click.createTroubleReport');
		if( formOk ) {
			$("#createTroubleReportButton").on('click.createTroubleReport', function(event){ CreateTroubleReport.create(parseInt($('#createTroubleReportTroubleReportTypeId').val()), $('#createTroubleReportSlogan').val(), $('#createTroubleReportContent').val()); });
			$("#createTroubleReportButton").removeClass('disabled');
		}
		else {
			$("#createTroubleReportButton").addClass('disabled');
		}

		return formOk;
	},
	
	creationSucceeded: function(result) {
		Popup.hide(CreateTroubleReport);
		Message.display("Success!", "Trouble report filed successfully.<br /><br />Thank you!");
	},
};
