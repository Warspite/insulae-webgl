var colladaLoaded = function() {
	include("rendering/Viewport.js");
	include("rendering/three/ThreeRenderer.js");
	include("rendering/three/THREExt.js");
	include("rendering/three/ThreeCameraController.js");

	include("rendering/three/viewer/ThreeAreaViewer.js");
	
	include("rendering/three/sceneInteractor/ThreeAreaInteractor.js");
	
	include("rendering/sceneContent/AreaSceneContent.js");
};

var threeLoaded = function() {
	include("lib/ColladaLoader.js", colladaLoaded);
};

var jqueryLoaded = function() {
	include("lib/jquery.mousewheel.js");
};

include("lib/jquery-1.7.2.min.js", jqueryLoaded);
//include("lib/three.min.js", threeLoaded);
include("lib/three.js", threeLoaded);
include("lib/Tween.js");
include("lib/RequestAnimFrame.js");

include("data/DynamicData.js");
include("data/StaticData.js");

include("io/InputInterpreter.js");
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

include("html/widget/Widget.js");

include("html/widget/bottomRight/BottomRightBarWidget.js");
include("html/widget/bottomRight/MinimapWidget.js");

include("html/widget/popup/CreateAvatarPopup.js");
include("html/widget/popup/CreateTroubleReport.js");
include("html/widget/popup/ErrorMessage.js");
include("html/widget/popup/Message.js");
include("html/widget/popup/Popup.js");
include("html/widget/popup/RegisterAccount.js");
include("html/widget/popup/SelectAvatarPopup.js");

include("html/widget/top/CurrentSessionWidget.js");
include("html/widget/top/HelpAndTroubleReportWidget.js");
include("html/widget/top/LoginWidget.js");
include("html/widget/top/TopBarWidget.js");

include("html/util/FormUtility.js");
include("html/util/HtmlInit.js");
include("html/util/Tooltip.js");

include("Heartbeat.js");
include("Overloads.js");
include("Init.js");
