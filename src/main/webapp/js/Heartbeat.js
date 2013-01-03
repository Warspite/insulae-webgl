var Heartbeat = {
	lastBeat: new Date().getTime(),
	beginningOfTime: new Date().getTime(),
	
	beat : function() {
		var heartbeat = {now: new Date().getTime(), tickTime: new Date().getTime() - Heartbeat.lastBeat, totalTime: new Date().getTime() - Heartbeat.beginningOfTime};	
		Heartbeat.lastBeat = heartbeat.now;
		
		TWEEN.update();
		Viewport.render(heartbeat);
		
		requestAnimFrame(Heartbeat.beat);
	}
}
