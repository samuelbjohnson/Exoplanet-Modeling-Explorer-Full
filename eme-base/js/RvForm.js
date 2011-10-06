/*License information needs to go here*/

dojo.provide("org.exoplanets.eme.js.RvForm");

dojo.require("org.exoplanets.eme.js.RvParameter");
dojo.require("org.exoplanets.eme.js.science.Orbels");

dojo.declare("org.exoplanets.eme.js.RvForm", null, {

	constructor: function(/*Node*/containerNode) {
		var fieldsetNode, legendNode;
		
		this.orbels = new org.exoplanets.eme.js.science.Orbels({});
		
		fieldsetNode = dojo.create("fieldset", {class: "orbelsSet"}, containerNode);
		legendNode = dojo.create("legend", {class: "orbelsSetLegend", innerHTML: "Parameters"}, fieldsetNode);
		
		
		this.getContainerNode = function() {
			return fieldsetNode;
		};
		
		this.setContainerNode = function(newContainer) {
			fieldsetNode = newContainer;
		};
		
		this.setupSliders();
	},
	
	getOrbels: function() {
		return this.orbels;
	},
	
	setOrbels: function(newOrbels) {
		this.orbels = newOrbels;
	},
	
	setupSliders: function() {
		var s = {}, prop;
		
		s.P = new org.exoplanets.eme.js.RvParameter(dojo.create("div", {}, this.getContainerNode()), {
			parameterName: "Period",
			name: "period",
			minimum: 0.01,
			value: 10
		});
		
		s.tp = new org.exoplanets.eme.js.RvParameter(dojo.create("div", {}, this.getContainerNode()), {
			parameterName: "Time of Periastron",
			name: "timeOfPeriastron",
			value: 0
		});
		
		s.e = new org.exoplanets.eme.js.RvParameter(dojo.create("div", {}, this.getContainerNode()), {
			parameterName: "Eccentricity",
			name: "eccentricity",
			minimum: 0,
			maximum: 1,
			value: 0
		});
		
		s.om = new org.exoplanets.eme.js.RvParameter(dojo.create("div", {}, this.getContainerNode()), {
			parameterName: "Omega",
			name: "omega",
			minimum: 0,
			maximum: 360,
			value: 0
		});
		
		s.k = new org.exoplanets.eme.js.RvParameter(dojo.create("div", {}, this.getContainerNode()), {
			parameterName: "Radial Velocity Semi-Amplitude",
			name: "semiAmplitude",
			minimum: 0,
			value: 20
		});
		
		s.cmvel = new org.exoplanets.eme.js.RvParameter(dojo.create("div", {}, this.getContainerNode()), {
			parameterName: "Center of Mass Velocity",
			name: "cmvel",
			minimum: -200,
			maximum: 200,
			value: 0
		});
		
		s.dvdt = new org.exoplanets.eme.js.RvParameter(dojo.create("div", {class: "lastOrbelParameter"}, this.getContainerNode()), {
			parameterName: "dvdt",
			name: "dvdt",
			value: 0
		});
		
		this.sliders =  s;
		
		for(prop in s) {
			dojo.connect(s[prop], "onChange", this, this.updateValues);
		}
		
	},
	
	updateValues: function() {
		console.log("RvForm.updateValues()");
		var tempOrbels = {};
		for(prop in this.sliders) {
			tempOrbels[prop] = (this.sliders[prop]).getValue();
		}
		
		this.setOrbels(new org.exoplanets.eme.js.science.Orbels(tempOrbels));
		
		this.updateComplete();
	},
	
	/* 
		The purpose of this function is to create an event that will
		be triggered when the update is complete
	*/
	updateComplete: function() {
		console.log("RvForm.updateComplete()");
	}
	
	

});