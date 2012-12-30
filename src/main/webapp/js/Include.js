var colladaLoaded = function() {
	include("rendering/SceneContainer.js");
	include("rendering/THREExt.js");

	include("scenes/AreaScene.js");
};

var threeLoaded = function() {
	include("lib/ColladaLoader.js", colladaLoaded);
};

include("lib/jquery-1.7.2.min.js");
//include("lib/three.min.js", threeLoaded);
include("lib/three.js", threeLoaded);
include("lib/Tween.js");
include("lib/RequestAnimFrame.js");

include("data/DynamicData.js");
include("data/StaticData.js");

include("io/CameraController.js");
include("io/Key.js");
include("io/Keyboard.js");
include("io/Mouse.js");
include("io/Server.js");

include("util/event/EventDispatcher.js");
include("util/event/EventHandler.js");
include("util/event/EventPropagation.js");
include("util/event/EventType.js");

include("util/Params.js");
include("util/Session.js");
include("util/UtilityFunctions.js");

include("html/CreateAvatar.js");
include("html/CreateTroubleReport.js");
include("html/ErrorMessage.js");
include("html/FormUtility.js");
include("html/HtmlInit.js");
include("html/MenuBar.js");
include("html/Message.js");
include("html/RegisterAccount.js");

include("Overloads.js");
include("Init.js");