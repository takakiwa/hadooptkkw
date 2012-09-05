//var regionView=new RegionView();

var regionViewUp = {
	viewClassName : "RegionView",
	rootView : appView
};
var regionViewDown = {
	viewClassName : "RegionView",
	rootView : appView
};

var memoryGraphViewElement = {
	viewClassName : "wgp.DygraphElementView",
	viewAttribute : {
		width : 300,
		height : 300,
		graphId : "Memory",
		attributes : {
			xlabel : "Time",
			ylabel : "Memory",
			labels : [ "time", "PC1", "PC2" ]
		}
	}
};

var cpuGraphViewElement = {
	viewClassName : "wgp.DygraphElementView",
	viewAttribute : {
		width : 300,
		height : 300,
		graphId : "CPU",
		attributes : {
			xlabel : "Time",
			ylabel : "CPU ",
			labels : [ "time", "PC1", "PC2" ]
		}
	}
};

var parentTmpElement = {
	viewClassName : "wgp.MultiAreaView",
	rootView : appView,
	collection : [ regionViewUp, regionViewDown ]
// collection : [ memoryGraphViewElement, cpuGraphViewElement ]
};

wgp.constants.VIEW_SETTINGS = {
	// "default" : graphAreaTabElement,
	// "/graph1/" : tabViewElement,
	"/takakiwa/" : parentTmpElement
};