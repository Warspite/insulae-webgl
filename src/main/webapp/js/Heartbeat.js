var Heartbeat = {
	lastBeat: new Date().getTime(),
	
	beat : function() {
		var now = new Date().getTime();
		var elapsedTime = now - Heartbeat.lastBeat;
		
		TWEEN.update();
		Viewport.render(elapsedTime);
		
		Heartbeat.lastBeat = now;
		requestAnimFrame(Heartbeat.beat);
	}
}
