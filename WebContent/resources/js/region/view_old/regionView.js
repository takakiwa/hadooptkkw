// 画面情報

// paperの高さ
var paperHeight = 750;
// paperの幅
var paperWidth = 750;

var separateGraphX = 100;

var regionChartWidth = paperWidth - separateGraphX;

// グラフの上部の領域
var paperHeightUp = paperHeight * 0.7;
var paperHeightDown = paperHeight - paperHeightUp;
// string offset
var stringHeightOffset = -10;

var DisplayMode = "node";// "task";

var dataEnter = [ {
	"measurement_time" : 2425346,
	"table_name" : "table1",
	"measurement_value" : {
		"raoh" : 23,
		"toki" : 8,
		"jagi" : 13
	}
}, {
	"measurement_time" : 2425346,
	"table_name" : "table2",
	"measurement_value" : {
		"raoh" : 2,
		"toki" : 8,
		"jagi" : 13
	}
}, {
	"measurement_time" : 2425346,
	"table_name" : "table3",
	"measurement_value" : {
		"raoh" : 11,
		"toki" : 8,
		"jagi" : 13
	}
}, {
	"measurement_time" : 2425346,
	"table_name" : "table4",
	"measurement_value" : {
		"raoh" : 71,
		"toki" : 8,
		"jagi" : 5
	}
}, {
	"measurement_time" : 2425346,
	"table_name" : "table5",
	"measurement_value" : {
		"raoh" : 71,
		"toki" : 8,
		"jagi" : 13
	}
}, {
	"measurement_time" : 2425347,
	"table_name" : "table1",
	"measurement_value" : {
		"raoh" : 41,
		"toki" : 4,
		"jagi" : 63
	}
}, {
	"measurement_time" : 2425347,
	"table_name" : "table2",
	"measurement_value" : {
		"raoh" : 71,
		"toki" : 8,
		"jagi" : 13
	}
}, {
	"measurement_time" : 2425347,
	"table_name" : "table3",
	"measurement_value" : {
		"raoh" : 21,
		"toki" : 8,
		"jagi" : 13
	}
}, {
	"measurement_time" : 2425347,
	"table_name" : "table4",
	"measurement_value" : {
		"raoh" : 31,
		"toki" : 2,
		"jagi" : 73
	}
}, {
	"measurement_time" : 2425348,
	"table_name" : "table1",
	"measurement_value" : {
		"raoh" : 11,
		"toki" : 8,
		"jagi" : 13
	}
}, {
	"measurement_time" : 2425348,
	"table_name" : "table2",
	"measurement_value" : {
		"raoh" : 81,
		"toki" : 8,
		"jagi" : 13
	}
}, {
	"measurement_time" : 2425348,
	"table_name" : "table3",
	"measurement_value" : {
		"raoh" : 31,
		"toki" : 8,
		"jagi" : 13
	}
}, {
	"measurement_time" : 2425348,
	"table_name" : "table4",
	"measurement_value" : {
		"raoh" : 51,
		"toki" : 7,
		"jagi" : 7
	}
}, {
	"measurement_time" : 2425348,
	"table_name" : "table5",
	"measurement_value" : {
		"raoh" : 11,
		"toki" : 8,
		"jagi" : 13
	}
}, {
	"measurement_time" : 2425349,
	"table_name" : "table1",
	"measurement_value" : {
		"raoh" : 11,
		"toki" : 8,
		"jagi" : 33
	}
}, {
	"measurement_time" : 2425349,
	"table_name" : "table2",
	"measurement_value" : {
		"raoh" : 11,
		"toki" : 5,
		"jagi" : 13
	}
}, {
	"measurement_time" : 2425349,
	"table_name" : "table3",
	"measurement_value" : {
		"raoh" : 11,
		"toki" : 8,
		"jagi" : 13
	}
}, {
	"measurement_time" : 2425349,
	"table_name" : "table4",
	"measurement_value" : {
		"raoh" : 11,
		"toki" : 8,
		"jagi" : 13
	}
} ];

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

var keyNum = [ "raoh", "toki", "jagi" ];

var idCounter = {};

function getChartPosition(x, y) {
	return {
		posX : x + separateGraphX,
		posY : y
	};
}

// /////////////時間から矢印の位置情報への変換を行う関数/////////////////////////////////
// ////////グローバルのminGraph と maxGraph//////////////////////////////////////////
// ////////rowNum は 0 はじまり/////////////////////////////////////////////////////
/*
 * function calcArrowLengthAndStartPos(startTime, finishTime, trialTime,
 * allTrialTime, rowNum) { var x = 0, y = 0, width = 0; // 幅 width =
 * regionChartWidth * (finishTime - startTime) * 1.0 / intervalTime; // スタートx位置
 * x = separateGraphX + regionChartWidth * (startTime - minGraphTime) * 1.0 /
 * intervalTime; // console.log("separateGraphX: " + separateGraphX + "
 * arrowwidth " + // regionChartWidth // + " intervalTime " + intervalTime + "
 * startTime " + startTime // + " finishTime " + finishTime + " mingraph " +
 * minGraphTime); // スタートy位置 y = cellHeight * trialTime / (1 + allTrialTime) +
 * rowNum * cellHeight; // console.log("x = " + x + " y = " + y + " width = " +
 * width); return { posX : x, posY : y, length : width }; }
 */

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
	// width=regionChartWidth*0.9/keyNumkari.length*0.95;

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
	width = 0.9 * (regionChartWidth * 0.9 / widthNum);
	// height = paperHeight * 0.9 / maxRegionNum;
	proWidth = 0.9 * regionChartWidth / widthNum;
	proHeight = 0.9 * paperHeightUp / maxRegionNum;
	for ( var i = 0; i < propertyArray.length; i++) {
		var heightTmp = 0;
		heightTmp = propertyArray[i].height;
		propertyArray[i].width = width;
		propertyArray[i].height = proHeight * propertyArray[i].height;

		propertyArray[i].x = propertyArray[i].x * proWidth
				+ (regionChartWidth * 0.9 / widthNum) * ((1 - 0.9) / 2)
				+ regionChartWidth * ((1 - 0.9) / 2) + separateGraphX;
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
	width = 0.7 * (regionChartWidth * 0.9 / widthNum);
	// height = paperHeight * 0.9 / maxNum;
	proWidth = 0.9 * regionChartWidth / widthNum;
	proHeight = 0.9 * paperHeightDown / maxNum;
	for ( var i = 0; i < propertyArray.length; i++) {
		var heightTmp = 0;
		heightTmp = propertyArray[i].height;
		propertyArray[i].width = width;
		propertyArray[i].height = proHeight * propertyArray[i].height;

		propertyArray[i].x = propertyArray[i].x * proWidth
				+ (regionChartWidth * 0.9 / widthNum) * ((1 - 0.7) / 2)
				+ regionChartWidth * ((1 - 0.9) / 2) + separateGraphX;

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
	// width = 0.7 * (regionChartWidth * 0.9 / widthNum);
	// height = paperHeight * 0.9 / maxNum;
	proWidth = 0.9 * regionChartWidth / widthNum;
	proHeight = 0.9 * paperHeightDown / maxNum;
	for ( var i = 0; i < propertyArray.length; i++) {
		var heightTmp = 0;
		heightTmp = propertyArray[i].height;
		// propertyArray[i].width = width;
		propertyArray[i].height = proHeight * propertyArray[i].height;

		propertyArray[i].x = propertyArray[i].x * proWidth
				+ (regionChartWidth * 0.9 / widthNum) * (1 / 2)
				+ regionChartWidth * ((1 - 0.9) / 2) + separateGraphX;
		propertyArray[i].y = paperHeightUp + paperHeightDown * ((1 - 0.9) / 2)
				+ propertyArray[i].height;

	}
	return propertyArray;

}

var sortString = "default";

// var taskSortFunctionTable = {
// "task" : taskIDSort,
// "node" : nodeSort
// };

var RegionView = wgp.AbstractView.extend({
	initialize : function() {
		this.viewType = wgp.constants.VIEW_TYPE.VIEW;
		this.collection = new parentTmpModelCollection();
		this.attributes = {};
		this.registerCollectionEvent();

		this.paper = new Raphael(document.getElementById(this.$el.attr("id")),
				this.width, this.height);
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
			width : regionChartWidth,
			pointX : startLineX,
			pointY : paperHeightUp,
			color : "black"
		});

		new wgp.LineStateElementView({
			model : modelDataRow,
			paper : this.paper,
			state : "rerror"
		});

		var cellCounter = Math.floor(paperHeight / cellHeight);

		var i = 0;

		// var rowCounter = 0;

		var data = dataEnter;
		var data3 = pickUp(datakari);
		var data4 = pickUp(datakari1);

		var modelInfo;

		// ある時刻におけるデータ配列の取得

		var timeArray = sameTimeRegion(data).timeArray;
		var time = sameTimeRegion(data).time;

		// グラフの最大の高さ

		var propertyInfo = maxRegion(timeArray, keyNum);

		// コンポーネントの情報を取得

		var modelInfo = widthHeight(propertyInfo.propertyArray,
				propertyInfo.maxRegionNum);
		// alert(modelInfo);

		// alert(data3);
		var propertyInfo1 = queue(data3);
		var propertyInfo2 = latency(data4);
		// alert(propertyInfo1.propertyArray1.length);

		// 縮尺の調整

		var modelInfo1 = widthHeightReverse(propertyInfo1.propertyArray1,
				propertyInfo1.maxQueueNum);
		var modelInfo2 = widthHeightReverseLine(propertyInfo2.propertyArray2,
				propertyInfo2.maxLatencyNum);

		// alert(modelInfo.length);

		// region数の表示

		for ( var k = 0; k < modelInfo.length; k++) {
			// alert(modelInfo[k].height + " " + modelInfo[k].width + "
			// "
			// + modelInfo[k].x + " " + modelInfo[k].y);
			var modelData_region = new wgp.MapElement({
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

			new wgp.RegionStateElementView({
				model : modelData_region,
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

			var modelData_queue = new wgp.MapElement({
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
			this.elem = new wgp.QueueStateElementView({
				model : modelData_queue,
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
			var modelData_latency;
			if (k < modelInfo2.length - 1) {
				modelData11 = new wgp.MapElement({
					objectId : 90000 + 2 * k,
					objectName : null,
					height : modelInfo2[k + 1].height - modelInfo2[k].height,
					width : (regionChartWidth * 0.9 / keyNum.length),
					pointX : modelInfo2[k].x,
					pointY : modelInfo2[k].y,
					strokeWidth : 10
				});

			}
			modelData_latency = new wgp.MapElement({
				objectId : 90000 + 2 * k + 1,
				objectName : null,
				height : 10,
				// - modelInfo2[k].height,
				width : 10,
				pointX : modelInfo2[k].x,
				pointY : modelInfo2[k].y,
				strokeWidth : 10
			});

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
					time : time,
					// allHost : keyNum,
					// tableNameList : propertyInfo.tableNameList,
					hostname : modelInfo2[k].hostname,
					value : String(modelInfo2[k].value)
				// tableName : modelInfo[k].tableName
				}

			});
			new wgp.LatencyActionStateElementView({
				model : modelData_latency,
				paper : this.paper,
				state : stateString,
				info : {
					time : time,
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
					pointY : cellHeight * 1.0 / 2 + rowCounter * cellHeight, // +
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
		// new wgp.ArrowStateElementView({
		// model : modelData,
		// paper : this.paper,
		// state : "rerror"
		// });
		//
		// var modelData2 = new wgp.MapElement({
		// objectId : 12,
		// objectName : null,
		// height : 0,
		// width : 200,
		// pointX : 100,
		// pointY : 100
		// });
		// new wgp.ArrowStateElementView({
		// model : modelData2,
		// paper : this.paper,
		// state : "merror"
		// });
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

		// /sortを実施
		executeTaskSort(sampleDatas, DisplayMode);
		for ( var i = 0; i < sampleDatas.length; i++) {
			console.log("HostName :" + sampleDatas[i].Hostname + " "
					+ sampleDatas[i].StartTime);
		}
		for ( var i = 0; i < sampleDatas.length; i++) {
			console.log("taskName :" + sampleDatas[i].TaskAttemptID);
		}
		// セレクトメニューの追加を行う。////////////////////////////////////////////
		// $("#" + this.$el.attr("id"))
		// .append(
		// '<form><select name="job select" id="jobSelecter"><option
		// value="1">job1</option><option value="2">job2</option><option
		// value="3">job3</option></select></form><div
		// class="clearSpace"></div>'
		// + '<div id="jobInfoSpace"
		// style="border:solid;border-color:green;border-width:4px;"><div
		// id="right_info"></div><div id="left_info"></div></div>'
		// + '<div class="clearSpace"></div>');
		// $("#jobSelecter").css({
		// width : "200px",
		// height : "20px",
		// marginTop : "10px",
		// marginRight : "10px",
		// float : "right",
		// });
		// $("#jobInfoSpace").css({
		// width : "600px",
		// height : "60px",
		// marginTop : "10px",
		// marginRight : "10px",
		// float : "right",
		// });
		// $("#right_info").css({
		// width : "300px",
		// height : "60px",
		// float : "right",
		// });
		// $("#left_info").css({
		// width : "300px",
		// height : "60px",
		// float : "left",
		// });
		// $(".clearSpace").css({
		// height : "5px",
		// clear : "both"
		// });
		// ///////////////////////////////////////////////////////////

		// ボタンたちの追加を行う。////////////////////////////////////////////
		// $("#" + this.$el.attr("id"))
		// .append(
		// '<div id="buttons"><input type="button" id="taskButton"
		// value="task"></input></br><input type="button"
		// id="nodeButton"
		// value="node"></input></br><div id="taskInfoSpace"
		// style="border:solid;border-color:red;border-width:4px;"></div>');
		// $("#buttons").css({
		// marginLeft : "10px",
		// float : "left",
		// });
		// $("#taskButton").css({
		// width : "100px",
		// height : "40px",
		// });
		// $("#nodeButton").css({
		// // marginLeft:"10px",
		// width : "100px",
		// height : "40px",
		// });
		// $("#taskInfoSpace").css({
		// width : "110px",
		// height : "400px",
		// marginTop : "5px",
		// marginRight : "5px",
		// float : "left",
		// });
		// ///////////////////////////////////////////////////////////

		// arrow用のdiv Tagの作成を行う。////////////////////////////////////
		// $("#" + this.$el.attr("id")).append(
		// '<div id="regionChart"></div>');
		// $("#regionChart").css({
		// width : "750px",
		// height : "350px",
		// overflow : "scroll",
		// overflowX : "hidden",
		// float : "right",
		// backgroundColor : "#EEEEEE"
		// });
		// var regionView = new RegionChartView({
		// id : "regionChart",
		// rootView : this
		// });
		// /////////////////////////////////////////////////////////////////

		// graph用のdiv Tagの作成を行う。//////////////////////////////////////
		// $("#" + this.$el.attr("id")).append('<div
		// id="dygraphChart"></div>');
		// $("#dygraphChart").css({
		// width : "700px",
		// height : "200px",
		// backgroundColor : "#EEEEEE",
		// float : "right",
		// });

		// var dygraphView = new DygraphChartView({
		// id : "dygraphChart",
		// rootView : this
		// });

		// /////////////////////////////////////////////////////////////////

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

});