var regionViewUp = {
	viewClassName : "RegionView",
	viewAttribute : {
		width : 500,
		height : 400
	}
};
var regionViewDown = {
	viewClassName : "RegionView",
	viewAttribute : {
		width : 500,
		height : 200
	}
};

var parentTmpElement = {
	viewClassName : "wgp.MultiAreaView",
	rootView : appView,
	collection : [ regionViewUp, regionViewDown ]
};

wgp.constants.VIEW_SETTINGS = {
	// "default" : graphAreaTabElement,
	// "/graph1/" : tabViewElement,
	"/takakiwa/" : parentTmpElement
};