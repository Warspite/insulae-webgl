var Heartbeat = {
	lastBeat: new Date().getTime(),
	beginningOfTime: new Date().getTime(),
	
	beat : function() {
		var heartbeat = {now: new Date().getTime(), tickTime: new Date().getTime() - Heartbeat.lastBeat, totalTime: new Date().getTime() - Heartbeat.beginningOfTime};	
		Heartbeat.lastBeat = heartbeat.now;
		
		TWEEN.update();
		InputInterpreter.heartbeat(heartbeat);
		Viewport.render(heartbeat);
		Tooltip.heartbeat(heartbeat);
		Mouse.heartbeat(heartbeat);
		
		requestAnimFrame(Heartbeat.beat);
	}
}
