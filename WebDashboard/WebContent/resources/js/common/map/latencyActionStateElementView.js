function plusMinus(num) {
	if (num > 0)
		return 1;
	else if (num < 0)
		return -1;
	else
		return 1;

}

function addMouseoverregion(regionElement, region) {

	if ($.isArray(regionElement)) {
		for ( var i = 0; i < regionElement.length; i++) {
			regionElement[i].object.mouseover(function(event) {
				// alert(this.regionInfo.time+" "+this.regionInfo.tableName+"
				// ");

				var region = this.regionInfo;
				// alert(region.value + " " + region.hostname);
				var now = new Date();

				now.setTime(region.time);
				// var find = new Date();
				// find.setTime(region.time);
				var infoString = "Time:</br>" + now + "</br>"
						+ "Hostname:</br>" + region.hostname + "</br>"
						+ "Amount:</br>" + region.value + "</br>";
				// + "TaskAttemptID:</br>" + region.TaskAttemptID
				// + "</br>" + "Status:</br>" + region.Status + "</br>"
				// + "StartTime:</br>" + startd + "</br>"
				// + "FinishTime:</br>" + find + "</br>"
				// + "Hostname:</br>" + region.Hostname + "</br>";
				$("#taskInfoSpace").html(infoString);
			});
		}
	} else {
		regionElement.object.mouseover(function() {
			console.log(this);
			var region = this.regionInfo;
			var now = new Date();
			// alert(region.time);

			now.setTime(region.time);
			// var region = this.regionInfo;
			// var startd = new Date();
			// startd.setTime(region.StartTime);
			// var find = new Date();
			// find.setTime(region.FinishTime);
			var infoString = "Time:</br>" + now + "</br>" + "Hostname:</br>"
					+ region.hostname + "</br>" + "Amount:</br>" + region.value
					+ "</br>";
			$("#taskInfoSpace").html(infoString);
		});
	}
}

var regionMinLength = 10;
var regionMaxLength = 30;

wgp.LatencyActionStateElementView = Backbone.View.extend({
	// /stateを渡す。NORMAL or ERROR or WARN
	initialize : function(argument) {
		_.bindAll();
		this.model.set({
			state : argument.state
		});
		// alert(this.model.get("state"));
		// console.log(argument.state);
		this.regionInfo = argument.info;
		// console.log(this.regionInfo.time);
		this._paper = argument.paper;
		if (this._paper == null) {
			alert("paper is not exist");
			return;
		}
		this.id = this.model.get("objectId");
		this.render();
	},
	render : function() {
		// this.regionInfo.tableNameList.length
		var color = this.getStateColor();
		this.model.set({
			"attributes" : {
				fill : color,
				stroke : color,
				"stroke-width" : 10
			}
		}, {
			silent : true
		});
		var lengthOfregion = Math.sqrt(this.model.attributes.width
				* this.model.attributes.width + this.model.attributes.height
				* this.model.attributes.height);

		var regionLength = lengthOfregion * 0.12;
		if (regionLength <= regionMinLength)
			regionLength = regionMinLength;
		if (regionLength >= regionMaxLength)
			regionLength = regionMaxLength;
		var overModelData = new wgp.MapElement({
			objectId : 2,
			objectName : null,
			height : regionLength * plusMinus(this.model.attributes.height),
			width : -regionLength * plusMinus(this.model.attributes.width),
			pointX : this.model.attributes.pointX + this.model.attributes.width
					+ 2.5,
			pointY : this.model.attributes.pointY
					+ this.model.attributes.height - 2.5
		});
		var underModelData = new wgp.MapElement({
			objectId : 3,
			objectName : null,
			height : -regionLength * plusMinus(this.model.attributes.height),
			width : -regionLength * plusMinus(this.model.attributes.width),
			pointX : this.model.attributes.pointX + this.model.attributes.width
					+ 2.5,
			pointY : this.model.attributes.pointY
					+ this.model.attributes.height + 2.5
		});
		overModelData.set({
			"attributes" : {
				fill : color,
				stroke : color,
				"stroke-width" : 7
			}
		}, {
			silent : true
		});
		underModelData.set({
			"attributes" : {
				fill : color,
				stroke : color,
				"stroke-width" : 7
			}
		}, {
			silent : true
		});
		this.element = [];
		for ( var i = 0; i < 1; i++) {
			console.log(this.model.attributes);
			this.element[i] = new ellipse(this.model.attributes, this._paper);
		}
		for ( var i = 0; i < 1; i++) {
			this.element[i] = new ellipse(this.model.attributes, this._paper);
		}
		this.element[0].object.regionInfo = {
			hostname : this.regionInfo.hostname,
			// tableName : this.regionInfo.tableName
			time : this.regionInfo.time,
			value : this.regionInfo.value
		};

		this.element[0].mouseover = function() {
             this.regionInfo.hostname;
             this.regionInfo.time;
             this.regionInfo.value;
		};

		// alert(this.element[0].object.regionInfo.hostname+"
		// "+this.element[0].object.regionInfo.tableName);
		// this.element[1].object.regionInfo = {
		// hostname : this.regionInfo.hostname,
		// tableName : this.regionInfo.tableName
		// };
		// this.element[2].object.regionInfo = {
		// hostname : this.regionInfo.hostname,
		// tableName : this.regionInfo.tableName
		// };
		addMouseoverregion(this.element, this);
	},
	update : function(model) {
		var instance = this;
		var color = this.getStateColor();
		this.model.set({
			"fill" : color
		}, {
			silent : true
		});
		this.element[0].setAttributes(model);
		// this.element[1].setAttributes(model);
		// this.element[2].setAttributes(model);
	},
	remove : function(property) {
		this.element[0].hide();
		// this.element[1].hide();
		// this.element[2].hide();
	},
	getStateColor : function() {
		// var loopColor = this.regionInfo.tableNameList.length;
		// var state = this.model.get("state");
		var colorNum;
		// colorNum = this.regionInfo.tableNameList
		// .indexOf(this.regionInfo.tableName) % 16;
		// alert(colorNum);

		var colorArray = new Array(16);

		colorArray[0] = "rgba(100,50,200,0.05)";
		colorArray[1] = "rgba(100,100,100,0.05)";
		colorArray[2] = "rgba(100,150,50,0.05)";
		colorArray[3] = "rgba(100,200,200,0.05)";
		colorArray[4] = "rgba(200,50,100,0.05)";
		colorArray[5] = "rgba(200,100,150,0.05)";
		colorArray[6] = "rgba(200,150,50,0.05)";
		colorArray[7] = "rgba(200,200,100,0.05)";
		colorArray[8] = "rgba(50,50,200,0.05)";
		colorArray[9] = "rgba(50,100,150,0.05)";
		colorArray[10] = "rgba(50,150,100,0.05)";
		colorArray[11] = "rgba(50,200,50,0.05)";
		colorArray[12] = "rgba(150,50,100,0.05)";
		colorArray[13] = "rgba(150,100,50,0.05)";
		colorArray[14] = "rgba(150,150,100,0.05)";
		colorArray[15] = "rgba(150,200,50,0.05)";
		// "rgba(100,100,100,0.05)"
		var color = "rgba(50,50,50,0.05)";
		// var color = wgp.constants.STATE_COLOR[state];
		if (color == null) {
			color = wgp.constants.STATE_COLOR[wgp.constants.STATE.NORMAL];
		}
		return color;
	},

});