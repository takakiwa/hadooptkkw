var RegionConponentView = wgp.AbstractView.extend({
	initialize : function(argument) {
		this.viewType = wgp.constants.VIEW_TYPE.VIEW;
		this.collection = new RegionModelCollection();
		this.attributes = {};
		this.registerCollectionEvent();

		this.paper = argument.paper;
		this.maxId = 0;
		 // argument.dataProperty;
		// this.pointX = argument.pointX;
		// this.pointY = argument.pointY;

		var realTag = $("#" + this.$el.attr("id"));
		if (this.width == null) {
			this.width = realTag.width();
		}
		if (this.height == null) {
			this.height = realTag.height();
		}
		// this.width = argument.width;
		// this.height = argument.height;
		this.id = this.model.get("objectId");
		this.render(argument.dataProperty);
		
	},
	render : function() {
		
		this.graphInfo();
		this.model.set({pointX : this.pointX
			,pointY : this.pointY
			,width : this.width
			,height : this.height
		});
		var color = "green";
		this.model.set({
			"attributes" : {
				fill : color
			}
		}, {
			silent : true
		});
		this.element = new rectangle(this.model.attributes, this._paper);
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
		
		// console.log('called removeModel');
	}
});