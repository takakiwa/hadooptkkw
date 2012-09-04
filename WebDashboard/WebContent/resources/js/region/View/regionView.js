halook = {};
halook.region = {};
halook.region.constants = {};
halook.region.constants.minTime = 100;

var RegionView = wgp.AbstractView
		.extend({
			initialize : function() {
				this.viewType = wgp.constants.VIEW_TYPE.VIEW;
				this.collection = new RegionModelCollection();
				this.attributes = {};
				this.registerCollectionEvent();
				// this.paper =argument .paper;
				this.maxId = 0;

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

				// this.regionMuitiConponentView = new Array();
				// this.regionMultiConponentView.push(new
				// RegionConponentView());
				// this.regionPartView= new regionPartView();
				// console.log('called initialize parent view');
				// this.id = this.model.get("objectId");

				var dataEnter = testData;
				this.regionInfo = this.sameTimeRegion(dataEnter);
				this.regionInfo1 = data1;
				this.regionInfo2 = data2;
				this.keyNum = keyNum;
				this.time = this.regionInfo.time;
				this.render();
				// this.dataDevide();
			},
			render : function() {
				var instance = this;
				var graphDataInterval1 = this.startLoop("contents_area_0_0",
						instance);

				setInterval(graphDataInterval1(instance), 1000);
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
			startLoop : function(windowsId, instance) {
				var timeArray = this.regionInfo.timeArray;
				var data1 = this.regionInfo1;
				var data2 = this.regionInfo2;
				var keyNum = this.keyNum;
				var time = this.time;
				console.log(instance);

				function innerFunction(instance) {
					var propertyInfo = instance.regionPlace(timeArray, keyNum);

					// コンポーネントの情報を取得

					var modelInfo = instance.widthHeight(
							propertyInfo.propertyArray,
							propertyInfo.maxRegionNum);
					// alert(modelInfo);

					// alert(data3);
					var propertyInfo1 = instance.queue(data1);
					var propertyInfo2 = instance.latency(data2);
					// alert(propertyInfo1.propertyArray1.length);

					// 縮尺の調整
					var regionGraphNum = modelInfo.length;

					var modelInfo1 = instance.widthHeightReverse(
							propertyInfo1.propertyArray1,
							propertyInfo1.maxQueueNum);
					var modelInfo2 = instance.widthHeightReverseLine(
							propertyInfo2.propertyArray2,
							propertyInfo2.maxLatencyNum);
					// this.stateDecide();
					for ( var i = 0; i < regionGraphNum; i++) {
						var regionConponentView = new RegionConponentView({
							model : modelInfo[i],
							paper : instance.paper

						});
					}
					;
					var regionConponentView1 = new RegionConponentView({
						model : modelInfo1,
						paper : instance.paper

					});
					var regionConponentView2 = new RegionConponentView({
						model : modelInfo2,
						paper : instance.paper

					});
					var sendData = [ {
						windowId : windowId,
						data : [ regionConponentView1, regionConponentView2 ]
					} ];

					appView.notifyEvent(sendData);

				}
				;
				return innerFunction;
				// this.model.set({
				// pointX : this.pointX,
				// pointY : this.pointY,
				// width : this.width,
				// height : this.height
				// });

				// console.log('call render');
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
						// alert(tableNameList);
						height = height
								+ timeArray[i].measurement_value[keyNum[j]];

						// =paperHeight*0.9/hostRegionNum;

						y = paperHeightUp - height;
						propertyArray.push({
							x : j,
							y : y,
							width : 1,
							height : height,
							tableName : timeArray[i].table_name,
							hostname : keyNum[j],
							value : timeArray[i].measurement_value[keyNum[j]]

						// tableNameList : tableNameList
						});
						// alert(propertyArray.tableNameList);
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
					y = paperHeightUp - height;

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
					y = paperHeightUp;

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
				width = 0.9 * (regionChartWidth * 0.9 / widthNum);
				// height = paperHeight * 0.9 / maxRegionNum;
				proWidth = 0.9 * regionChartWidth / widthNum;
				proHeight = 0.9 * paperHeightUp / maxRegionNum;
				for ( var i = 0; i < propertyArray.length; i++) {
					var heightTmp = 0;
					heightTmp = propertyArray[i].height;
					propertyArray[i].width = width;
					propertyArray[i].height = proHeight
							* propertyArray[i].height;

					propertyArray[i].x = propertyArray[i].x * proWidth
							+ (regionChartWidth * 0.9 / widthNum)
							* ((1 - 0.9) / 2) + regionChartWidth
							* ((1 - 0.9) / 2) + separateGraphX;
					propertyArray[i].y = (propertyArray[i].y + heightTmp - paperHeightUp)
							* proHeight
							+ paperHeightUp
							- paperHeightUp
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
				width = 0.7 * (regionChartWidth * 0.9 / widthNum);
				// height = paperHeight * 0.9 / maxNum;
				proWidth = 0.9 * regionChartWidth / widthNum;
				proHeight = 0.9 * paperHeightDown / maxNum;
				for ( var i = 0; i < propertyArray.length; i++) {
					var heightTmp = 0;
					heightTmp = propertyArray[i].height;
					propertyArray[i].width = width;
					propertyArray[i].height = proHeight
							* propertyArray[i].height;

					propertyArray[i].x = propertyArray[i].x * proWidth
							+ (regionChartWidth * 0.9 / widthNum)
							* ((1 - 0.7) / 2) + regionChartWidth
							* ((1 - 0.9) / 2) + separateGraphX;

					// alert(-(propertyArray[i].y + heightTmp - paperHeightUp));

					propertyArray[i].y = -(propertyArray[i].y + heightTmp - paperHeightUp)
							* proHeight
							+ paperHeightUp
							+ paperHeightDown
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
				// width = 0.7 * (regionChartWidth * 0.9 / widthNum);
				// height = paperHeight * 0.9 / maxNum;
				proWidth = 0.9 * regionChartWidth / widthNum;
				proHeight = 0.9 * paperHeightDown / maxNum;
				for ( var i = 0; i < propertyArray.length; i++) {
					var heightTmp = 0;
					heightTmp = propertyArray[i].height;
					// propertyArray[i].width = width;
					propertyArray[i].height = proHeight
							* propertyArray[i].height;

					propertyArray[i].x = propertyArray[i].x * proWidth
							+ (regionChartWidth * 0.9 / widthNum) * (1 / 2)
							+ regionChartWidth * ((1 - 0.9) / 2)
							+ separateGraphX;
					propertyArray[i].y = paperHeightUp + paperHeightDown
							* ((1 - 0.9) / 2) + propertyArray[i].height;

				}
				return propertyArray;

			}

		});