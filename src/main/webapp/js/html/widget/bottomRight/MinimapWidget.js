var MinimapWidget = {
	id: 'minimapWidget',
	selectedAreaIcon: $('#selectedAreaIcon'),
	
	iconSize: {width: 18, height: 18},
	mapArea: {left: 17, top: 28, bottom: 147, right: 334},
	
	clear: function() {
		$('#realmName').html('');
		$('#areaIconContainer').empty();
		MinimapWidget.selectedAreaIcon.css('visibility', 'collapse');
	},
	
	setup: function() {
	},
		
	realmSelected: function(realm) {
		MinimapWidget.clear();
		$('#realmName').html(realm.name);
		Server.req({
			servlet: "geography/Area",
			params: {realmId: realm.id}, 
			successCallback: MinimapWidget.areasLoaded});
	},
	
	areasLoaded: function(result) {
		var mapSize = {height: MinimapWidget.mapArea.bottom - MinimapWidget.mapArea.top - MinimapWidget.iconSize.height, width: MinimapWidget.mapArea.right - MinimapWidget.mapArea.left - MinimapWidget.iconSize.width};

		$.each(result.content.areas, function(index, area) {
			var areaType = StaticData.areaTypes[area.areaTypeId];
			var png = "../images/icon/areaType/" + areaType.canonicalName + ".png";
			var x = MinimapWidget.mapArea.left + (mapSize.width/2)*(1 + area.coordinatesX / 100);
			var y = MinimapWidget.mapArea.top + (mapSize.height/2)*(1 + area.coordinatesY / 100);
			
			$('#areaIconContainer').append(
				$('<img/>').attr('src', png).addClass('mouseVisible').attr('tooltip', area.name).addClass('minimapAreaIcon').click(function() { MinimapWidget.areaSelected(area, $(this)); }).css({
					left: x,
					top: y,
					width: MinimapWidget.iconSize.width,
					height: MinimapWidget.iconSize.height})
			);
		});
	},
	
	areaSelected: function(area, areaIcon) {
		MinimapWidget.positionAreaSelectionMarker(areaIcon);
		
		if(area)
			SceneContainer.setDirector(new AreaDirector(area));
		else
			SceneContainer.setDirector(null);
	},
	
	positionAreaSelectionMarker: function(areaIcon) {
		var bounds = {
			left: areaIcon.position().left - 2,
			top: areaIcon.position().top - 2,
			width: areaIcon.width() + 4,
			height: areaIcon.height() + 4 
		};
		
		MinimapWidget.selectedAreaIcon.css({
			visibility: 'visible',
			'background-size': '' + bounds.width + 'px ' + bounds.height + 'px'
		}).css(bounds);
	}
};
