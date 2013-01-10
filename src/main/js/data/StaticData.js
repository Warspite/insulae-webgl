var StaticData = {
	tickProgress: function() {
		StaticData.progress.completed += 1;
		
		if(StaticData.progress.completed >= StaticData.progress.target && !StaticData.progress.completionReported && StaticData.progress.completionCallback) {
			StaticData.progress.completionCallback(StaticData.progress);
			StaticData.progress.completionReported = true;
		}
		else if(StaticData.progress.progressCallback) {
			StaticData.progress.progressCallback(StaticData.progress);
		}
	},
	 
	load: function(p) {
		StaticData.progress = Params.check(p, null, {target: 16, completed: 0, progressCallback: null, completionCallback: null, completionReported: false});
		
		Server.req({servlet: "geography/AreaType", successCallback: StaticData.areaTypesLoaded});
		Server.req({servlet: "geography/LocationType", successCallback: StaticData.locationTypesLoaded});
		Server.req({servlet: "geography/TransportationType", successCallback: StaticData.transportationTypesLoaded});
		Server.req({servlet: "geography/TransportationCost", successCallback: StaticData.transportationCostsLoaded});
		Server.req({servlet: "geography/ResourceType", successCallback: StaticData.resourceTypesLoaded});
		Server.req({servlet: "industry/BuildingType", successCallback: StaticData.buildingTypesLoaded});
		Server.req({servlet: "industry/ItemType", successCallback: StaticData.itemTypesLoaded});
		Server.req({servlet: "industry/Action", successCallback: StaticData.actionsLoaded});
		Server.req({servlet: "industry/ActionItemCost", successCallback: StaticData.actionItemCostsLoaded});
		Server.req({servlet: "industry/ActionItemOutput", successCallback: StaticData.actionItemOutputsLoaded});
		Server.req({servlet: "industry/ResourceRequiredNearActionTargetLocation", successCallback: StaticData.resourcesRequiredNearActionTargetLocationLoaded});
		Server.req({servlet: "industry/LocationTypeRequiredNearActionTargetLocation", successCallback: StaticData.locationTypesRequiredNearActionTargetLocationLoaded});
		Server.req({servlet: "world/Realm", successCallback: StaticData.realmsLoaded});
		Server.req({servlet: "world/Race", successCallback: StaticData.racesLoaded});
		Server.req({servlet: "world/Sex", successCallback: StaticData.sexesLoaded});
		Server.req({servlet: "meta/TroubleReportType", successCallback: StaticData.troubleReportTypesLoaded});
	},
	
	areaTypesLoaded: function(result) {
		StaticData.areaTypes = Server.mapify(result.content.areaTypes);
		StaticData.tickProgress();
	},

	locationTypesLoaded: function(result) {
		StaticData.locationTypes = Server.mapify(result.content.locationTypes);
		StaticData.tickProgress();
	},

	transportationTypesLoaded: function(result) {
		StaticData.transportationTypes = Server.mapify(result.content.transportationTypes);
		StaticData.tickProgress();
	},

	transportationCostsLoaded: function(result) {
		StaticData.transportationCosts = result.content.transportationCosts;
		StaticData.tickProgress();
	},

	resourceTypesLoaded: function(result) {
		StaticData.resourceTypes = Server.mapify(result.content.resourceTypes);
		StaticData.tickProgress();
	},
	
	buildingTypesLoaded: function(result) {
		StaticData.buildingTypes = Server.mapify(result.content.buildingTypes);
		StaticData.tickProgress();
	},

	itemTypesLoaded: function(result) {
		StaticData.itemTypes = Server.mapify(result.content.itemTypes);
		StaticData.tickProgress();
	},

	realmsLoaded: function(result) {
		StaticData.realms = Server.mapify(result.content.realms);
		StaticData.tickProgress();
	},

	racesLoaded: function(result) {
		StaticData.races = Server.mapify(result.content.races);
		StaticData.tickProgress();
	},

	sexesLoaded: function(result) {
		StaticData.sexes = Server.mapify(result.content.sexes);
		StaticData.tickProgress();
	},

	actionsLoaded: function(result) {
		StaticData.actions = Server.mapify(result.content.actions);
		StaticData.tickProgress();
	},

	actionItemCostsLoaded: function(result) {
		StaticData.actionItemCosts = result.content.actionItemCosts;
		StaticData.tickProgress();
	},

	actionItemOutputsLoaded: function(result) {
		StaticData.actionItemOutputs = result.content.actionItemOutputs;
		StaticData.tickProgress();
	},

	resourcesRequiredNearActionTargetLocationLoaded: function(result) {
		StaticData.resourcesRequiredNearActionTargetLocation = Server.mapify(result.content.resourcesRequiredNearActionTargetLocation, "actionId");
		StaticData.tickProgress();
	},

	locationTypesRequiredNearActionTargetLocationLoaded: function(result) {
		StaticData.locationTypesRequiredNearActionTargetLocation = Server.mapify(result.content.locationTypesRequiredNearActionTargetLocation, "actionId");
		StaticData.tickProgress();
	},

	troubleReportTypesLoaded: function(result) {
		StaticData.troubleReportTypes = result.content.troubleReportTypes;
		StaticData.tickProgress();
	},
};
