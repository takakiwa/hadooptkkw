//paperの高さ
var paperHeight = 1500;
// paperの幅
var paperWidth = 725;
// 矢印絵画領域の始まるオフセット分
var startLineX = 100;
// ひとつのセルの高さの設定
var cellHeight = 80;
// アローチャート部分の長さ
var arrowChartWidth = paperWidth - startLineX;

// グラフの上部の領域
var paperHeightUp = paperHeight * 0.7;
var paperHeightDown = paperHeight - paperHeightUp;
// string offset
var stringHeightOffset = -10;

// IDと登場回数を記憶する辞書
var idCounter = {};

// //////////////////////////////////////アロー関数群////////////////////////////////////////////////////////////

// アローチャート座標をチャート全体座標系に直す。
function getChartPosition(x, y) {
	return {
		posX : x + startLineX,
		posY : y
	};
}

// /////////////時間から矢印の位置情報への変換を行う関数/////////////////////////////////
// ////////グローバルのminGraph と maxGraph//////////////////////////////////////////
// ////////rowNum は 0 はじまり/////////////////////////////////////////////////////
/*
 * function calcArrowLengthAndStartPos(startTime, finishTime, trialTime,
 * allTrialTime, rowNum) { var x = 0, y = 0, width = 0; // 幅 width =
 * arrowChartWidth * (finishTime - startTime) * 1.0 / intervalTime; // スタートx位置 x =
 * startLineX + arrowChartWidth * (startTime - minGraphTime) * 1.0 /
 * intervalTime; // console.log("startLineX: " + startLineX + " arrowwidth " + //
 * arrowChartWidth // + " intervalTime " + intervalTime + " startTime " +
 * startTime // + " finishTime " + finishTime + " mingraph " + minGraphTime); //
 * スタートy位置 y = cellHeight * trialTime / (1 + allTrialTime) + rowNum *
 * cellHeight; // console.log("x = " + x + " y = " + y + " width = " + width);
 * return { posX : x, posY : y, length : width }; }
 */

var keyNum = [ "raoh", "toki", "jagi" ];

function sameTimeRegion(testData) {
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
}
// var tableArray = new Array();
/*
 * for ( var i = 0; i < timeArray.length; i++) {
 * tableArray.push(timeArray[i].table_name); }
 */

function maxRegion(timeArray, keyNum) {

	var hostRegionNum = 0;
	var maxRegionNum = 0;
	var x = 0;
	var y = 0;
	var width = 0;
	var height = 0;
	var propertyArray = new Array();
	var tableNameList = new Array();
	// width=arrowChartWidth*0.9/keyNumkari.length*0.95;

	width = keyNum.length;

	for ( var j = 0; j < keyNum.length; j++) {

		for ( var i = 0; i < timeArray.length; i++) {

			if (tableNameList.indexOf(timeArray[i].table_name) == -1) {
				tableNameList.push(timeArray[i].table_name);
			}
			// alert(tableNameList);
			height = height + timeArray[i].measurement_value[keyNum[j]];

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
}
var datakari = {
	"raoh" : 37,
	"toki" : 58,
	"jagi" : 27
};
var datakari1 = {
	"raoh" : 18,
	"toki" : 36,
	"jagi" : 29
};

function pickUp(dataJSON) {
	var data = new Array()

	for ( var j = 0; j < keyNum.length; j++) {
		data.push(dataJSON[keyNum[j]]);

	}
	return data;
}

function queue(data) {

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
}

function latency(data) {

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
}

function widthHeight(propertyArray, maxRegionNum) {
	var widthNum = keyNum.length;
	var heightNum = maxRegionNum;
	var width;
	var height;
	var proWidth;
	var proHeight;
	width = 0.9 * (arrowChartWidth * 0.9 / widthNum);
	// height = paperHeight * 0.9 / maxRegionNum;
	proWidth = 0.9 * arrowChartWidth / widthNum;
	proHeight = 0.9 * paperHeightUp / maxRegionNum;
	for ( var i = 0; i < propertyArray.length; i++) {
		var heightTmp = 0;
		heightTmp = propertyArray[i].height;
		propertyArray[i].width = width;
		propertyArray[i].height = proHeight * propertyArray[i].height;

		propertyArray[i].x = propertyArray[i].x * proWidth
				+ (arrowChartWidth * 0.9 / widthNum) * ((1 - 0.9) / 2)
				+ arrowChartWidth * ((1 - 0.9) / 2) + startLineX;
		propertyArray[i].y = (propertyArray[i].y + heightTmp - paperHeightUp)
				* proHeight + paperHeightUp - paperHeightUp * ((1 - 0.9) / 2)
				- propertyArray[i].height;

	}
	return propertyArray;

}

function widthHeightReverse(propertyArray, maxNum) {
	var widthNum = keyNum.length;
	var heightNum = maxNum;
	var width;
	var height;
	var proWidth;
	var proHeight;
	width = 0.7 * (arrowChartWidth * 0.9 / widthNum);
	// height = paperHeight * 0.9 / maxNum;
	proWidth = 0.9 * arrowChartWidth / widthNum;
	proHeight = 0.9 * paperHeightDown / maxNum;
	for ( var i = 0; i < propertyArray.length; i++) {
		var heightTmp = 0;
		heightTmp = propertyArray[i].height;
		propertyArray[i].width = width;
		propertyArray[i].height = proHeight * propertyArray[i].height;

		propertyArray[i].x = propertyArray[i].x * proWidth
				+ (arrowChartWidth * 0.9 / widthNum) * ((1 - 0.7) / 2)
				+ arrowChartWidth * ((1 - 0.9) / 2) + startLineX;

		// alert(-(propertyArray[i].y + heightTmp - paperHeightUp));

		propertyArray[i].y = -(propertyArray[i].y + heightTmp - paperHeightUp)
				* proHeight + paperHeightUp + paperHeightDown * ((1 - 0.9) / 2);

	}
	return propertyArray;

}
function widthHeightReverseLine(propertyArray, maxNum) {
	var widthNum = keyNum.length;
	var heightNum = maxNum;
	// var width;
	var height;
	var proWidth;
	var proHeight;
	// width = 0.7 * (arrowChartWidth * 0.9 / widthNum);
	// height = paperHeight * 0.9 / maxNum;
	proWidth = 0.9 * arrowChartWidth / widthNum;
	proHeight = 0.9 * paperHeightDown / maxNum;
	for ( var i = 0; i < propertyArray.length; i++) {
		var heightTmp = 0;
		heightTmp = propertyArray[i].height;
		// propertyArray[i].width = width;
		propertyArray[i].height = proHeight * propertyArray[i].height;

		propertyArray[i].x = propertyArray[i].x * proWidth
				+ (arrowChartWidth * 0.9 / widthNum) * (1 / 2)
				+ arrowChartWidth * ((1 - 0.9) / 2) + startLineX;
		propertyArray[i].y = paperHeightUp + paperHeightDown * ((1 - 0.9) / 2)
				+ propertyArray[i].height;

	}
	return propertyArray;

}
function widthHeight2(propertyArray, maxRegionNum) {
	var widthNum = keyNum.length;
	var heightNum = maxRegionNum;
	var width;
	var height;
	var startX;
	var startY;
	var xInterval;
	width = 0.9 * (arrowChartWidth * 0.9 / widthNum);
	xInterval = arrowChartWidth * 0.9 / widthNum;
	startX = (arrowChartWidth * 0.9 / widthNum) * ((1 - 0.9) / 2)
			+ arrowChartWidth * ((1 - 0.9) / 2);
	height = paperHeightUp * 0.9 / maxRegionNum;
	startY = paperHeightUp * ((0.9 + 1) / 2);
	// paperHeightUp*0.9/hostRegionNum;

}

// function calcArrowLengthAndStartPos(timeArray,keyNumkari) { var x = 0, y = 0,
// width = 0,height=0; var ykari=new Array(); for(var k=0;k<keyNumkari;k++){
// ykari[k]=new Array(); } var hostRegionNum=0; var RegionArray=new Array();
// width =arrowChartWidth*0.9/keyNumkari.length*0.95; for(var
// i=0;i<keyNumkari.length;i++){
// 
// x=arrowChartWidth*((1-0.9)/2)+arrowChartWidth*0.9/keyNumkari.length*(1-0.95)+width*keyNumkari[i];
// }
// for(var j=0;j<timeArray.length;j++){
// ykari=+timeArray[i].measurement_value[keyNumkari[j]]; }
//  
//  
// RegionArray.push({x:width:});
//  
// height=paperHeight*0.9/; }

// ///////////時間から×印の位置情報への変換を行う関数/////////////////////////////////
// //////グローバルのminGraph と maxGraph//////////////////////////////////////////
// //////rowNum は 0
// はじまり/////////////////////////////////////////////////////
function calcErrorLengthAndStartPos(eventTime, trialTime, allTrialTime, rowNum) {
	// /////////ここで長さとスタート位置の計算
	var x = 0, y = 0;
	x = startLineX + arrowChartWidth * (eventTime - minGraphTime) * 1.0
			/ intervalTime;
	// スタートy位置
	y = cellHeight * trialTime * 1.0 / (1 + allTrialTime) + rowNum * cellHeight;
	// console.log("x = " + x + " y = " + y);

	return {
		posX : x,
		posY : y
	};
}
//
// //
// //
// //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
var ArrowChartView = wgp.AbstractView
		.extend({
			initialize : function() {
				this.viewType = wgp.constants.VIEW_TYPE.VIEW;
				this.collection = new arrowModelCollection();
				this.attributes = {};
				this.registerCollectionEvent();
				this.paper = new Raphael(document.getElementById(this.$el
						.attr("id")), this.width, this.height);
				this.paper.setSize(paperWidth, paperHeight);
				var sd = new Date();
				var fd = new Date();
				var subd = new Date();
				sd.setTime(sampleDatasJob.StartTime);
				fd.setTime(sampleDatasJob.FinishTime);
				subd.setTime(sampleDatasJob.SubmitTime);
				$("#right_info").html(
						"JobID:" + sampleDatasJob.JobID + "</br>JobName:"
								+ sampleDatasJob.JobName + "</br>STATUS:"
								+ sampleDatasJob.Status + "</br>");
				$("#left_info").html(
						"StartTime:" + sd.toLocaleString() + "</br>FinishTime:"
								+ fd.toLocaleString() + "</br>SUBMIT_TIME:"
								+ subd.toLocaleString() + "</br>");

				// 縦線の表示 端から100px
				var modelDataCol = new wgp.MapElement({
					objectId : 0,
					objectName : null,
					height : paperHeight,
					width : 0,
					pointX : startLineX,
					pointY : 0,
					color : "black"
				});

				new wgp.LineStateElementView({
					model : modelDataCol,
					paper : this.paper,
					state : "rerror"
				});
				var modelDataRow = new wgp.MapElement({
					objectId : 1,
					objectName : null,
					height : 0,
					width : arrowChartWidth,
					pointX : startLineX,
					pointY : paperHeightUp,
					color : "black"
				});

				new wgp.LineStateElementView({
					model : modelDataRow,
					paper : this.paper,
					state : "rerror"
				});
				// /複数会登場するIDの記憶と番号登録
				for ( var i = 0; i < sampleDatas.length; i++) {
					var idstring = sampleDatas[i].TaskAttemptID;
					var idArray = idstring.split('_');
					idArray[5] = idArray[5].replace(/0/g, '');
					if (idArray[5] != 0) {
						if (idCounter[(idArray[3] + "_" + idArray[4])] == undefined)
							idCounter[(idArray[3] + "_" + idArray[4])] = idArray[5];
						else if (idCounter[(idArray[3] + "_" + idArray[4])] < idArray[5])
							idCounter[(idArray[3] + "_" + idArray[4])] = idArray[5];
					}
				}
				//		
				//		
				//
				// /セルの線引きの作成
				var cellCounter = Math.floor(paperHeight / cellHeight);
				// console.log(cellCounter + "aaa");
				// for ( var i = 0; i < cellCounter + 1; i++) {

				// }

				var i = 0;
				// console.log(sampleDatas);

				// 矢印たちと×印の絵画の作成
				var rowCounter = 0;
				var data1 = sampleDatas;
				var data = dataEnter;
				var modelInfo;

				// 次のtimeArrayとsameTimeRegionはsameTimeRegion(data).timeArrayの前でもよさそう。

				var timeArray = sameTimeRegion(data).timeArray;
				var time = sameTimeRegion(data).time;
				var propertyInfo = maxRegion(timeArray, keyNum);
				var modelInfo = widthHeight(propertyInfo.propertyArray,
						propertyInfo.maxRegionNum);
				// alert(modelInfo);
				var data3 = pickUp(datakari);
				var data4 = pickUp(datakari1);
				// alert(data3);
				var propertyInfo1 = queue(data3);
				var propertyInfo2 = latency(data4);
				// alert(propertyInfo1.propertyArray1.length);
				var modelInfo1 = widthHeightReverse(
						propertyInfo1.propertyArray1, propertyInfo1.maxQueueNum);
				var modelInfo2 = widthHeightReverseLine(
						propertyInfo2.propertyArray2,
						propertyInfo2.maxLatencyNum);

				// alert(modelInfo.length);

				for ( var k = 0; k < modelInfo.length; k++) {
					// alert(modelInfo[k].height + " " + modelInfo[k].width + "
					// "
					// + modelInfo[k].x + " " + modelInfo[k].y);
					var modelData9 = new wgp.MapElement({
						objectId : 30000 + k,
						objectName : null,
						height : modelInfo[k].height,
						width : modelInfo[k].width,
						pointX : modelInfo[k].x,
						pointY : modelInfo[k].y,
					});

					var tableID = modelInfo[k].tableName;
					var stringArray = tableID;
					var stateString = "merror";

					// alert(tableID);

					// statusがエラーの場合の処理はこれも行う

					// alert(modelInfo.propertyArray[k].tableName);
					// alert(modelInfo.propertyArray);
					new wgp.RegionStateElementView({
						model : modelData9,
						paper : this.paper,
						state : stateString,
						info : {
							time : String(time),
							// allHost : keyNum,
							tableNameList : propertyInfo.tableNameList,
							hostname : modelInfo[k].hostname,
							tableName : modelInfo[k].tableName,
							value : String(modelInfo[k].value)
						}

					});

				}
				// alert(modelInfo1.length);
				for ( var k = 0; k < modelInfo1.length; k++) {

					// alert(modelInfo1[k].height + " " + modelInfo1[k].width
					// + " " + modelInfo1[k].x + " " + modelInfo1[k].y);

					var modelData10 = new wgp.MapElement({
						objectId : 50000 + k,
						objectName : null,
						height : modelInfo1[k].height,
						width : modelInfo1[k].width,
						pointX : modelInfo1[k].x,
						pointY : modelInfo1[k].y,
					});

					// var tableID = modelInfo1[k].tableName;
					// var stringArray = tableID;
					var stateString = "merror";

					// alert(tableID);

					// statusがエラーの場合の処理はこれも行う

					// if (data.Status == "ERROR") {

					// alert(modelInfo.propertyArray[k].tableName);
					// alert(String(modelInfo1[k].value));
					new wgp.QueueStateElementView({
						model : modelData10,
						paper : this.paper,
						state : stateString,
						info : {
							time : String(time),
							// allHost : keyNum,
							// tableNameList : propertyInfo.tableNameList,
							hostname : modelInfo1[k].hostname,
							value : String(modelInfo1[k].value)
						// tableName : modelInfo[k].tableName
						}

					});

				}

				for ( var k = 0; k < modelInfo2.length; k++) {
					// alert(modelInfo2[k].y - modelInfo2[k].height);
					var modelData11;
					if (k < modelInfo2.length - 1) {
						modelData11 = new wgp.MapElement({
							objectId : 90000 + k,
							objectName : null,
							height : modelInfo2[k + 1].height
									- modelInfo2[k].height,
							width : (arrowChartWidth * 0.9 / keyNum.length),
							pointX : modelInfo2[k].x,
							pointY : modelInfo2[k].y,
							strokeWidth : 10
						});

					}

					// var tableID = modelInfo1[k].tableName;
					// var stringArray = tableID;
					var stateString = "merror";

					// alert(tableID);

					// alert(modelInfo.propertyArray[k].tableName);
					new wgp.LatencyStateElementView({
						model : modelData11,
						paper : this.paper,
						state : stateString,
						info : {
							time : String(time),
							// allHost : keyNum,
							// tableNameList : propertyInfo.tableNameList,
							hostname : modelInfo2[k].hostname,
							value : String(modelInfo2[k].value)
						// tableName : modelInfo[k].tableName
						}

					});

				}

				// // textAreaの描画を行う。
				if (DisplayMode == "task") {
					var rowCounter = 0;
					for ( var i = 0; i < sampleDatas.length; i++) {
						var labelString = sampleDatas[i].TaskAttemptID;
						var stringArray = labelString.split('_');
						stringArray[5] = stringArray[5].replace(/0/g, '');
						if (stringArray[5] != 0) {
							// rowCounter--;
						}

						var modelData5 = new wgp.MapElement({
							objectId : 40000 + i,
							objectName : null,
							height : 0,
							width : 90,
							pointX : 5,
							pointY : cellHeight * 1.0 / 2 + rowCounter
									* cellHeight, // +
							// stringHeightOffset,
							text : stringArray[3] + "_" + stringArray[4],
							fontSize : 20
						});
						console.log("-----------" + stringArray[3] + "_"
								+ stringArray[4]);
						new wgp.TextAreaStateElementView({
							model : modelData5,
							paper : this.paper,
							state : "merror"
						});
						rowCounter++;
					}
				} else if (DisplayMode == "node") {

					for ( var i = 0; i < sampleDatas.length; i++) {
						var labelString = sampleDatas[i].Hostname;
						var tmpLabelArray = labelString.split('/');
						labelString = tmpLabelArray.join('\n');
						var modelData5 = new wgp.MapElement({
							objectId : 40000 + i,
							objectName : null,
							height : 0,
							width : 90,
							pointX : 5,
							pointY : cellHeight * 1.0 / 2 + i * cellHeight,// +
							// stringHeightOffset,//
							// *
							// tmpLabelArray.length,
							text : labelString,
							fontSize : 15
						});
						new wgp.TextAreaStateElementView({
							model : modelData5,
							paper : this.paper,
							state : "merror"
						});
					}
				}

				var modelData = new wgp.MapElement({
					objectId : 1,
					objectName : null,
					height : 0,
					width : 100,
					pointX : 150,
					pointY : 50
				});
				new wgp.ArrowStateElementView({
					model : modelData,
					paper : this.paper,
					state : "rerror"
				});

				var modelData2 = new wgp.MapElement({
					objectId : 12,
					objectName : null,
					height : 0,
					width : 200,
					pointX : 100,
					pointY : 100
				});
				new wgp.ArrowStateElementView({
					model : modelData2,
					paper : this.paper,
					state : "merror"
				});
				//
				// // /////グラフのtaskのカウントを実行

				this.maxId = 0;

				var realTag = $("#" + this.$el.attr("id"));
				if (this.width == null) {
					this.width = realTag.width();
				}
				if (this.height == null) {
					this.height = realTag.height();
				}

				console.log('called initialize');
			},
			render : function() {

				// this.entity.resize(this.width, this.height);

				console.log('call render');
			},
			onAdd : function(element) {
				console.log('call onAdd');
			},
			onChange : function(element) {
				console.log('called changeModel');
			},
			onRemove : function(element) {
				console.log('called removeModel');
			},
		});
