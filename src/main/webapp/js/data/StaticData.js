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
		StaticData.progress = Params.check(p, null, {target: 15, completed: 0, progressCallback: null, completionCallback: null, completionReported: false});
		
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
	
	locationTypesLoaded: function(result, progressMeter) {
		StaticData.locationTypes = Server.mapify(result.content.locationTypes);
		StaticData.tickProgress();
	},

	transportationTypesLoaded: function(result, progressMeter) {
		StaticData.transportationTypes = Server.mapify(result.content.transportationTypes);
		StaticData.tickProgress();
	},

	transportationCostsLoaded: function(result, progressMeter) {
		StaticData.transportationCosts = result.content.transportationCosts;
		StaticData.tickProgress();
	},

	resourceTypesLoaded: function(result, progressMeter) {
		StaticData.resourceTypes = Server.mapify(result.content.resourceTypes);
		StaticData.tickProgress();
	},
	
	buildingTypesLoaded: function(result, progressMeter) {
		StaticData.buildingTypes = Server.mapify(result.content.buildingTypes);
		StaticData.tickProgress();
	},

	itemTypesLoaded: function(result, progressMeter) {
		StaticData.itemTypes = Server.mapify(result.content.itemTypes);
		StaticData.tickProgress();
	},

	realmsLoaded: function(result, progressMeter) {
		StaticData.realms = Server.mapify(result.content.realms);
		StaticData.tickProgress();
	},

	racesLoaded: function(result, progressMeter) {
		StaticData.races = Server.mapify(result.content.races);
		StaticData.tickProgress();
	},

	sexesLoaded: function(result, progressMeter) {
		StaticData.sexes = Server.mapify(result.content.sexes);
		StaticData.tickProgress();
	},

	actionsLoaded: function(result, progressMeter) {
		StaticData.actions = Server.mapify(result.content.actions);
		StaticData.tickProgress();
	},

	actionItemCostsLoaded: function(result, progressMeter) {
		StaticData.actionItemCosts = result.content.actionItemCosts;
		StaticData.tickProgress();
	},

	actionItemOutputsLoaded: function(result, progressMeter) {
		StaticData.actionItemOutputs = result.content.actionItemOutputs;
		StaticData.tickProgress();
	},

	resourcesRequiredNearActionTargetLocationLoaded: function(result, progressMeter) {
		StaticData.resourcesRequiredNearActionTargetLocation = Server.mapify(result.content.resourcesRequiredNearActionTargetLocation, "actionId");
		StaticData.tickProgress();
	},

	locationTypesRequiredNearActionTargetLocationLoaded: function(result, progressMeter) {
		StaticData.locationTypesRequiredNearActionTargetLocation = Server.mapify(result.content.locationTypesRequiredNearActionTargetLocation, "actionId");
		StaticData.tickProgress();
	},

	troubleReportTypesLoaded: function(result, progressMeter) {
		StaticData.troubleReportTypes = result.content.troubleReportTypes;
		StaticData.tickProgress();
	},
};
