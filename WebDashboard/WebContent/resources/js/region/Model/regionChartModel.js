var regionChartModel = Backbone.Model.extend({
	defaults:{
		SubmitTime:null,
		StartTime:null,
		FinishTime:null,
		JobID:null,
		JobName:null,
		Status:null
	},
	idAttribute:"JobID",
});

var regionModelCollection = Backbone.Collection.extend({
	model : regionChartModel
});