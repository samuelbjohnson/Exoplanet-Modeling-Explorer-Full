/*License information needs to go here*/

dojo.provide("org.exoplanets.eme.js.RvGraph");

dojo.require("dojox.charting.Chart2D");
//dojo.require("org.exoplanets.eme.js.RvForm");

dojo.declare("org.exoplanets.eme.js.RvGraph", null, {

	/*
		The input object must define the following parameters:
		
		graphNode: an dom node that will contain the plot,
		rvForm: an org.exoplanets.eme.js.rvForm object,
		starForm: an org.exoplanets.eme.js.StarForm object
	*/
	constructor: function(args) {
		console.log("graph constructor");
		this.containerNode = args.graphNode;
		this.graphNode = dojo.create("div", {}, this.containerNode);
		dojo.addClass(this.graphNode, "RvGraph");
		
		this.form = args.rvForm;
		this.rvUtils = new org.exoplanets.eme.js.science.Utils();
		
		this.starData = args.starForm;
		
		this.chartParams = {
			minimum: -10,
			maximum: 10,
			increment: .1
		};
		
		this.buildChart();
		this.connectEvents();
	},
	
	generateSeries: function() {
		var 	orbels = this.form.getOrbels(),
				yValue, i,
				series = new Array();
		
		for (i = this.chartParams.minimum; i < this.chartParams.maximum; i += this.chartParams.increment) {
			yValue = this.rvUtils.rv_drive(i, [orbels]);
			series.push({x: i, y: yValue});
		}
		return series;
	},
	
	plotObservations: function() {
		var series, min, max;
		
		min = this.starData.getMinObservation();
		max = this.starData.getMaxObservation();
		this.chartParams = {
			minimum: min,
			maximum: max,
			increment: (max - min) / 100
		};
		series = this.starData.getSeries();
		this.chart.addSeries("observations", series, {plot: "observations"});
		this.updateChart();
	},
	
	buildChart: function() {
		var series;
		this.chart = new dojox.charting.Chart2D(this.graphNode);
		
		series = this.generateSeries();
		this.chart.addPlot("observations", {type: "MarkersOnly", lines: false, areas: false, markers: true});
		this.chart.addPlot("default", {type: "Lines"});
		
		this.chart.addAxis("x");
		this.chart.addAxis("y", {vertical: true});
		
		this.chart.addSeries("default", series);
		
		/*this.chart.addPlot("grid", {type: "Grid", 
			hAxis: "x",
			vAxis: "y",
			hMajorLines: true,
			vMajorLines: true,
			hMinorLines: false,
			vMinorLines: false
		});*/
		
		this.chart.render();
	},
	
	updateChart: function() {
		console.log("updating chart");
		if (this.chart === undefined) {
			this.buildChart();
		} else {
			this.chart.updateSeries("default", this.generateSeries());
			this.chart.render();
		}
	},
	
	connectEvents: function() {
		dojo.connect(this.form, "updateComplete", this, this.updateChart);
		dojo.connect(this.starData, "updateComplete", this, this.plotObservations);
	}
		

});