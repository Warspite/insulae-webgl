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

include("html/popup/CreateAvatar.js");
include("html/popup/CreateTroubleReport.js");
include("html/popup/ErrorMessage.js");
include("html/popup/Message.js");
include("html/popup/Popup.js");
include("html/popup/RegisterAccount.js");

include("html/topbar/CurrentSessionWidget.js");
include("html/topbar/HelpAndTroubleReportWidget.js");
include("html/topbar/LoginWidget.js");
include("html/topbar/TopBar.js");

include("html/util/FormUtility.js");
include("html/util/HtmlInit.js");

include("Overloads.js");
include("Init.js");