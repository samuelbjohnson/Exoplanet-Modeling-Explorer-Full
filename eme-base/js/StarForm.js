dojo.provide("org.exoplanets.eme.js.StarForm");

dojo.require("dijit.form.TextBox");
dojo.require("dijit.form.Button");
dojo.require("dijit.Dialog");
dojo.require("dijit.form.RadioButton");
dojo.require("dojox.data.XmlStore");

dojo.declare("org.exoplanets.eme.js.StarForm", null, {
	constructor: function(/*node*/ formContainer) {
		this.container = formContainer;
		this.buildHtml();
	},
	
	buildHtml: function() {
		this.form = dojo.create("form", {}, this.container);
		
		this.starNameBox = new dijit.form.TextBox({}, dojo.create("input", {type: "text", name: "starName"}, this.container));
		
		this.searchButton = new dijit.form.Button({label: "Find Star Data", onClick: dojo.hitch(this, this.retrieveNew)}, dojo.create("input", {type: "button"}, this.container));
	},
	
	getSeries: function() {
		return this.series;
	},
	
	retrieve: function(/*int*/obsId) {
		var query;
		
		this.obsOptionDialog.hide();
		
		query = "obsId=" + obsId;
		this.store = new dojox.data.XmlStore({
			url: "services/rvDataXml.php?" + query,
			rootItem: "observation"
		});
		this.store.fetch({
			onComplete: dojo.hitch(this, this.processXml),
			onError: dojo.hitch(this, this.error)
		});
	},
	
	retrieveNew: function() {
		var query, xhrArgs;
		
		query = "starName=" + this.starNameBox.getValue();
		
		xhrArgs = {
			url: "services/observationDataJson.php?" + query,
			handleAs: "json",
			sync: true,
			load: dojo.hitch(this, this.processObsId),
			error: dojo.hitch(this, this.error)
		};
		dojo.xhrGet(xhrArgs);
	},
	
	processObsId: function(/*json*/data) {
		var dialogDiv, _uniqueId;
		
		_uniqueId = function() {
			var 	idBase = "dojo_observationRef",
					id;
			if (! _uniqueId.idCount ) {
				_uniqueId.idCount = 1;
			}
			do{
				id = idBase + "_" + (_uniqueId.idCount ++);
			}while(dojo.byId(id) || dijit.byId(id));
			return id;
		};
		
		if (data["observations"].length < 1) {
			this.noStarsFound();
		} else if (data["observations"].length == 1) {
			this.retrieve(data["observations"][0]["obsId"]);
		} else {
			dialogDiv = dojo.create("div", {});
			dojo.forEach(data["observations"], dojo.hitch(this, function(obs, i) {
				var button, buttonInput, buttonLabel, buttonId, buttonDiv;
				
				buttonDiv = dojo.create(
					"div", {class: "observationPickerButtonDiv"}, dialogDiv
				);
				buttonId = _uniqueId();
				buttonInput = dojo.create(
					"input", {type: "radio", id: buttonId}, buttonDiv
				);
				buttonLabel = dojo.create
					("label", {
						for: buttonId, 
						innerHTML: obs["references"]
					}, buttonDiv
				);
				
				button = new dijit.form.RadioButton({
					checked: false,
					value: obs["references"],
					name: "pickCorrectObservation",
				}, buttonInput);
				
				dojo.connect(button, "onClick", this, function() {
					this.retrieve(obs["obsId"]);
				});
			}));
			this.obsOptionDialog = new dijit.Dialog({
				title: "Please select a set of observations",
				style: "width: 400px;"
			});
			this.obsOptionDialog.attr("content", dialogDiv);
			this.obsOptionDialog.show();
		}
	},
	
	noStarsFound: function() {
		alert("no stars found with that name");
	},
	
	processXml: function(items, request) {
		var min, max = -1;
		this.series = new Array();
		dojo.forEach(items, dojo.hitch(this, function(item) {
			var x = this.store.getValue(item, "time");
			if ( !min || x < min ) {
				min = x;
			}
			if (x > max) {
				max = x;
			}
			this.series.push({
				x: x,
				y: this.store.getValue(item, "rv")
			});
		}));
		this.minObservation = min;
		this.maxObservation = max;
		this.updateComplete();
	},
	
	error: function() {
		alert("xml error");
	},
	
	getMinObservation: function() {
		return Number(this.minObservation.toString());
	},
	
	getMaxObservation: function() {
		return Number(this.maxObservation.toString());
	},
	
	/* 
		The purpose of this function is to create an event that will
		be triggered when the update is complete
	*/
	updateComplete: function() {
		console.log("StarForm.updateComplete()");
	}
});