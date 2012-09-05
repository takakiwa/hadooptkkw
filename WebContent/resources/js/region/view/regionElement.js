var RegionElement=wgp.RegionElement = Backbone.Model.extend({
	defaults : {
		objectId : null,
		objectName : null,
		pointX : null,
		pointY : null,
		width : null,
		height : null,
		zIndex : null,
		URL : null,
		text : null
	},
	idAttribute : "objectId"
});

var MapElementList = Backbone.Collection.extend({
	model : wgp.RegionElement
});