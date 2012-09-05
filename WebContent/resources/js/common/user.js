var graphViewElement = {
	viewClassName : "wgp.DygraphElementView",
	viewAttribute : {
		term : 1800,
		noTermData : false
	}
};

var mapTabElement = {
	viewClassName : "wgp.MapView",
	tabTitle : "Map",
};

var graphAreaTabElement = { 
	viewClassName : "wgp.MultiAreaView",
	tabTitle : "Graph",
	collection :[graphViewElement]
};

var tabViewElement = {
	viewClassName: "wgp.TabView",
	collection:[mapTabElement, graphAreaTabElement]
};

var regionElement = {
		viewClassName : "RegionView",		
};

wgp.constants.VIEW_SETTINGS = {
	"default" : graphViewElement,
	"/table" : regionElement
};