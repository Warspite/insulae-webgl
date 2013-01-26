var BottomRightBarWidget = {
	id: 'bottomRightBarWidget',
	minimapToggleButtonId: 'minimapToggleButton',
	mimimapFolded: false,
	
	toggleMinimap: function() {
		BottomRightBarWidget.setMinimapFolding(!BottomRightBarWidget.minimapFolded);
	},
	
	setMinimapFolding: function(folded) {
		BottomRightBarWidget.minimapFolded = folded;
		
		BottomRightBarWidget.animateIntoPosition();
		BottomRightBarWidget.updateToggleButton();
	},
	
	updateToggleButton: function() {
		var img = 'minusButton.png';
		if(BottomRightBarWidget.minimapFolded)
			img = 'plusButton.png';
			
		$('#' + BottomRightBarWidget.minimapToggleButtonId).css('background-image', 'url(../images/icon/' + img + ')');		
	},
	
	animateIntoPosition: function() {
		var right = Widget.$(BottomRightBarWidget).width();
		if(BottomRightBarWidget.minimapFolded)
			right -= Widget.$(MinimapWidget).width();
			
		Widget.$(MinimapWidget).animate({right: right}, 220);
	},
	
	setup: function() {
		$('#' + BottomRightBarWidget.minimapToggleButtonId).click(BottomRightBarWidget.toggleMinimap);
		$('#' + BottomRightBarWidget.minimapToggleButtonId).attr('tooltip', 'Toggle the minimap.');
	},
};
