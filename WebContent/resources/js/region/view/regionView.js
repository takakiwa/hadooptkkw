halook = {};
halook.region = {};
halook.region.constants = {};
halook.region.constants.minTime = 100;
halook.region.constants.paperHeightUp = 500;
halook.region.constants.regionChartWidth = 600;
halook.region.constants.paperHeightDown = 300;
var RegionView = wgp.AbstractView
		.extend({
			initialize : function(arguments, treeSettings) {
				this.viewType = wgp.constants.VIEW_TYPE.VIEW;
				this.treeSettings = treeSettings;
				var realTag = $("#" + this.$el.attr("id"));
				var dataEnter = testData;
				this.regionInfo = this.sameTimeRegion(dataEnter);
				this.regionInfo1 = data1;
				this.regionInfo2 = data2;
				this.keyNum = keyNum;
				this.time = this.regionInfo.time;
				if (this.width == null) {
					this.width = realTag.width();
				}
				if (this.height == null) {
					this.height = realTag.height();
				}

				var appView = new wgp.AppView();
				appView.addView(this, treeSettings.id);
				var date = new Date();
				date = new Date(date.getTime() - 15000);

				this.registerCollectionEvent();
				this.render();
			},
			render : function() {
				$("#" + this.$el.attr("id")).append("<div id="regionUpView"></div>");				
				$("#" + this.$el.attr("id")).append("<div id="regionDownView"></div>");
				
				this.regionUpView = new 
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
			dataDevide : function(element) {
				// console.log('called removeModel');
			},
			startLoop : function(windowId, instance) {
				var timeArray = this.regionInfo.timeArray;
				// var data1 = this.regionInfo1;
				// var data2 = this.regionInfo2;
				var keyNum = this.keyNum;
				var time = this.time;
				var keyNumLength = keyNum.length;
				var objectId = 1;
				function innerFunction(instance) {
					var propertyInfo = instance.regionPlace(timeArray, keyNum);

					// コンポーネントの情報を取得

					var modelInfo = instance.widthHeight(
							propertyInfo.propertyArray,
							propertyInfo.maxRegionNum);

					var propertyInfo1 = instance.queue(data1);
					var propertyInfo2 = instance.latency(data2);
					// alert(propertyInfo1.propertyArray1.length);

					// 縮尺の調整
					var regionGraphNum1 = modelInfo.length;

					var modelInfo1 = instance.widthHeightReverse(
							propertyInfo1.propertyArray1,
							propertyInfo1.maxQueueNum);
					var modelInfo2 = instance.widthHeightReverseLine(
							propertyInfo2.propertyArray2,
							propertyInfo2.maxLatencyNum);
					// this.stateDecide();
					var tmpRegionConponentView;
					var tmpRegionConponentView1;
					var tmpRegionConponentView2;
					var regionConponentView = new Array();
					var regionConponentView1 = new Array();
					var regionConponentView2 = new Array();
					var regionConponent = new Array();
					var regionConponent1 = new Array();
					var regionConponent2 = new Array();
					for ( var j = 0; j < regionGraphNum1; j++) {
						objectId++;
						tmpRegionConponentView = {
							objectId : objectId,
							type : wgp.constants.CHANGE_TYPE.ADD,
							objectName : "RegionConponentView",
							model : modelInfo[j],
							// paper : instance.paper,
							info : {
								time : time,
								// allHost : keyNum,
								tableNameList : propertyInfo.tableNameList,
								hostname : modelInfo[j].hostname,
								tableName : modelInfo[j].tableName,
								value : modelInfo[j].value
							}
						};

						regionConponentView.push(tmpRegionConponentView);
						// regionConponent.push(regionElement);
					}

					for ( var i = 0; i < keyNumLength; i++) {
						objectId++;
						tmpRegionConponentView1 = {
							objectId : objectId,
							type : wgp.constants.CHANGE_TYPE.ADD,

							objectName : "RegionConponentView",
							model : modelInfo1[i],
							// paper : instance.paper,
							info : {
								time : time,
								// allHost : keyNum,
								// tableNameList : propertyInfo.tableNameList,
								hostname : modelInfo1[i].hostname,
								// tableName : modelInfo1[i].tableName,
								value : modelInfo1[i].value
							}
						};

						regionConponentView1.push(tmpRegionConponentView1);

						objectId++;

						tmpRegionConponentView2 = {
							objectId : objectId,
							type : wgp.constants.CHANGE_TYPE.ADD,

							objectName : "RegionConponentView",
							model : modelInfo2[i],
							// paper : instance.paper,
							info : {
								time : time,

								hostname : modelInfo2[i].hostname,

								value : modelInfo2[i].value
							}
						};

						regionConponentView2.push(tmpRegionConponentView2);
					}

					var sendData = [ {
						windowId : windowId,
						data : regionConponentView1
					} ];

					appView.notifyEvent(sendData);

				}
				;
				return innerFunction;
			},
			regionPlace : function(timeArray, keyNum) {
				var hostRegionNum = 0;
				var maxRegionNum = 0;
				var x = 0;
				var y = 0;
				var width = 0;
				var height = 0;
				var propertyArray = new Array();
				var tableNameList = new Array();
				// width=regionChartWidth*0.9/keyNumkari.length*0.95;

				width = keyNum.length;

				for ( var j = 0; j < keyNum.length; j++) {
					for ( var i = 0; i < timeArray.length; i++) {
						if (tableNameList.indexOf(timeArray[i].table_name) == -1) {
							tableNameList.push(timeArray[i].table_name);
						}
						height = height
								+ timeArray[i].measurement_value[keyNum[j]];
						y = halook.region.constants.paperHeightUp - height;
						propertyArray.push({
							x : j,
							y : y,
							width : 1,
							height : height,
							tableName : timeArray[i].table_name,
							hostname : keyNum[j],
							value : timeArray[i].measurement_value[keyNum[j]]

						});
					}
					if (maxRegionNum < height) {
						maxRegionNum = height;
						// alert(maxRegionNum);
					}

					hostRegionNum = 0;
					height = 0;

				}

				// height = paperHeight * 0.9 / maxRegionNum;

				return {

					maxRegionNum : maxRegionNum,

					propertyArray : propertyArray,

					tableNameList : tableNameList
				};
			},
			sameTimeRegion : function(testData) {
				var time = 0;

				var timeArray = new Array();
				// var hostMaxNum=4;
				time = testData[0].measurement_time;

				for ( var i = 0; i < testData.length; i++) {

					if (time == testData[i].measurement_time) {
						timeArray.push(testData[i]);
					} else {
						break;
					}
					time = testData[i].measurement_time;

				}
				return {
					timeArray : timeArray,
					time : time
				};
			},
			stateDecide : function() {
				var color = "green";
				this.model.set({
					"attributes" : {
						fill : color
					}
				}, {
					silent : true
				});
				this.element = new rectangle(this.model.attributes, this._paper);
			},
			pickUp : function(dataJSON) {
				var data = new Array()

				for ( var j = 0; j < keyNum.length; j++) {
					data.push(dataJSON[keyNum[j]]);

				}
				return data;
			},
			queue : function(data) {

				var x = 0;
				var y = 0;
				var width = 0;
				var height = 0;
				var propertyArray1 = new Array();
				var maxQueueNum = 0;

				// data.lengthはホスト数と仮定
				for ( var i = 0; i < data.length; i++) {
					height = data[i];
					if (maxQueueNum < height) {
						maxQueueNum = height;
					}
					y = halook.region.constants.paperHeightUp - height;

					propertyArray1.push({
						x : i,
						y : y,
						width : 1,
						height : height,
						hostname : keyNum[i],
						value : data[i]
					// tableNameList : tableNameList
					});

				}
				return {

					maxQueueNum : maxQueueNum,

					propertyArray1 : propertyArray1,

				};
			},
			latency : function(data) {

				var x = 0;
				var y = 0;
				var width = 0;
				var height = 0;
				var propertyArray2 = new Array();
				var maxLatencyNum = 0;

				// data.lengthはホスト数と仮定
				for ( var i = 0; i < data.length; i++) {
					height = data[i];
					if (maxLatencyNum < height) {
						maxLatencyNum = height;
					}
					y = halook.region.constants.paperHeightUp;

					propertyArray2.push({
						x : i,
						y : y,
						// width : 1,
						height : height,
						hostname : keyNum[i],
						value : data[i]
					// tableNameList : tableNameList
					});
					// alert(data.length);

				}
				return {

					maxLatencyNum : maxLatencyNum,

					propertyArray2 : propertyArray2,

				};
			},
			widthHeight : function(propertyArray, maxRegionNum) {
				var widthNum = keyNum.length;
				var heightNum = maxRegionNum;
				var width;
				var height;
				var proWidth;
				var proHeight;
				width = 0.9 * (halook.region.constants.regionChartWidth * 0.9 / widthNum);
				// height = paperHeight * 0.9 / maxRegionNum;
				proWidth = 0.9 * halook.region.constants.regionChartWidth
						/ widthNum;
				proHeight = 0.9 * halook.region.constants.paperHeightUp
						/ maxRegionNum;
				for ( var i = 0; i < propertyArray.length; i++) {
					var heightTmp = 0;
					heightTmp = propertyArray[i].height;
					propertyArray[i].width = width;
					propertyArray[i].height = proHeight
							* propertyArray[i].height;

					propertyArray[i].x = propertyArray[i].x
							* proWidth
							+ (halook.region.constants.regionChartWidth * 0.9 / widthNum)
							* ((1 - 0.9) / 2)
							+ halook.region.constants.regionChartWidth
							* ((1 - 0.9) / 2);
					propertyArray[i].y = (propertyArray[i].y + heightTmp - halook.region.constants.paperHeightUp)
							* proHeight
							+ halook.region.constants.paperHeightUp
							- halook.region.constants.paperHeightUp
							* ((1 - 0.9) / 2) - propertyArray[i].height;

				}
				return propertyArray;

			},
			widthHeightReverse : function(propertyArray, maxNum) {
				var widthNum = keyNum.length;
				var heightNum = maxNum;
				var width;
				var height;
				var proWidth;
				var proHeight;
				width = 0.7 * (halook.region.constants.regionChartWidth * 0.9 / widthNum);
				// height = paperHeight * 0.9 / maxNum;
				proWidth = 0.9 * halook.region.constants.regionChartWidth
						/ widthNum;
				proHeight = 0.9 * halook.region.constants.paperHeightDown
						/ maxNum;
				for ( var i = 0; i < propertyArray.length; i++) {
					var heightTmp = 0;
					heightTmp = propertyArray[i].height;
					propertyArray[i].width = width;
					propertyArray[i].height = proHeight
							* propertyArray[i].height;

					propertyArray[i].x = propertyArray[i].x
							* proWidth
							+ (halook.region.constants.regionChartWidth * 0.9 / widthNum)
							* ((1 - 0.7) / 2)
							+ halook.region.constants.regionChartWidth
							* ((1 - 0.9) / 2);

					// alert(-(propertyArray[i].y + heightTmp -
					// halook.region.constants.paperHeightUp));

					propertyArray[i].y = -(propertyArray[i].y + heightTmp - halook.region.constants.paperHeightUp)
							* proHeight
							+ halook.region.constants.paperHeightUp
							+ halook.region.constants.paperHeightDown
							* ((1 - 0.9) / 2);

				}
				return propertyArray;

			},
			widthHeightReverseLine : function(propertyArray, maxNum) {
				var widthNum = keyNum.length;
				var heightNum = maxNum;
				// var width;
				var height;
				var proWidth;
				var proHeight;
				// width = 0.7 * (halook.region.constants.regionChartWidth * 0.9
				// / widthNum);
				// height = paperHeight * 0.9 / maxNum;
				proWidth = 0.9 * halook.region.constants.regionChartWidth
						/ widthNum;
				proHeight = 0.9 * halook.region.constants.paperHeightDown
						/ maxNum;
				for ( var i = 0; i < propertyArray.length; i++) {
					var heightTmp = 0;
					heightTmp = propertyArray[i].height;
					// propertyArray[i].width = width;
					propertyArray[i].height = proHeight
							* propertyArray[i].height;

					propertyArray[i].x = propertyArray[i].x
							* proWidth
							+ (halook.region.constants.regionChartWidth * 0.9 / widthNum)
							* (1 / 2)
							+ halook.region.constants.regionChartWidth
							* ((1 - 0.9) / 2);
					propertyArray[i].y = halook.region.constants.paperHeightUp
							+ halook.region.constants.paperHeightDown
							* ((1 - 0.9) / 2) + propertyArray[i].height;

				}
				return propertyArray;

			},
			getTermData : function() {

			},

			getTextFile : function(fname) {
				var text = null;
				var ajax = new XMLHttpRequest();
				with (ajax) {
					/* @if(1) onreadystatechange @else@ */onload /* @end@ */= function() {
						readyState == 4 && status == 200
								&& (text = responseText);
					};
					open('GET', fname, false);
					send(null);
				}
				;
				return text;
			}
		});