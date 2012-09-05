var RegionConponentView = wgp.AbstractView.extend({
	initialize : function(argument) {
		console.log("aaaaa");
		_.bindAll();
		this.viewType = wgp.constants.VIEW_TYPE.VIEW;
		this.collection = new RegionModelCollection();
		// this.model=this.collection.model;
		this.attributes = {};

		this.maxId = 0;
		this.objectId = argument.objectId;
		this.model = argument.model;
		this.paper = argument.paper;
		this.info = argument.info;
		// this.model = argument.model;
		// this.objectId=argument.objectId;
		// argument.dataProperty;
		// this.pointX = argument.pointX;
		var realTag = $("#" + this.$el.attr("id"));
		if (this.width == null) {
			this.width = realTag.width();
		}
		if (this.height == null) {
			this.height = realTag.height();
		}
		// this.width = argument.width;
		// this.height = argument.height;
		// this.id = this.model.get("objectId");
		// this.model.set({
		// objectId : this.objectId
		// });
		// this.id = this.model.get("objectId");

		this.render();

	},
	render : function() {
		var modelTmp = this.model;
		var infoTmp = this.info;
		var regionElement = this.graphInfo(modelTmp);
		var regionInfo = this.pickUpInfo(infoTmp);

		var modelData = new wgp.MapStateElementView({
			model : regionElement,
			paper : this.paper,
		});

		// new wgp.MapStateElementView({
		// model : modelData9,
		// paper : this.paper,
		// state : stateString,
		// info : {
		// time : String(time),
		// // allHost : keyNum,
		// tableNameList : propertyInfo.tableNameList,
		// hostname : modelInfo[k].hostname,
		// tableName : modelInfo[k].tableName,
		// value : String(modelInfo[k].value)
		// }
		//
		// });
		// this.element = new rectangle(this.model.attributes, this.paper);
		// console.log('call render');
	},
	onAdd : function(element) {
		// console.log('call onAdd');
	},
	onChange : function(element) {
		// console.log('called changeModel');
	},
	onRemove : function(element) {
		// console.log('called removeModel');
	},
	graphInfo : function(element) {
		var regionElement = new wgp.MapElement({
			objectId : this.objectId,
			objectName : null,
			height : element.height,
			width : element.width,
			pointX : element.x,
			pointY : element.y
		});
		return regionElement;
		// console.log('called removeModel');
	},
	pickUpInfo : function(element) {
		// イベント処理
		// console.log('called removeModel');
	}

});