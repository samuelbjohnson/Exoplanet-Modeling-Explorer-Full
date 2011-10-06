dojo.provide("org.exoplanets.eme.js.RvParameter");

dojo.require("dijit.form.Slider");
dojo.require("dijit.form.NumberTextBox");

dojo.declare("org.exoplanets.eme.js.RvParameter", null, {
	
	/*
		The args parameter can define the following:
			parameterName: the name to be displayed for the parameter,
			name: the abbreviated name for the parameter (must be one word),
			value: the initial (default) value,
			minimum: the minimum value,
			maximum: the maximum value
	*/
	constructor: function(/*node*/ container, args) {
		this.__proto__ = dojo.mixin(args, this);
		
		this.container = container;
		dojo.addClass(this.container, "RvParameter");
		
		this.buildSlider();
		this.buildTextBox();
		this.linkInputs();
	},
	
	getValue: function() {
		return this.slider.getValue();
	},
	
	/* this method is intended to be used as an event*/
	onChange: function() {
		console.log("onChange() for ", this.parameterName);
	},
	
	buildSlider: function() {
		this.sliderContainer = dojo.create("div", {}, this.container);
		this.slider = new dijit.form.HorizontalSlider({
			name: this.name + "Slider",
			value: this.value,
			onChange: dojo.hitch(this, this.sliderChange),
			intermediateChanges: true
		}, this.sliderContainer);
		
		if(this.maximum) {
			this.slider.maximum = this.maximum;
		}
		if (this.minimum) {
			this.slider.minimum = this.minimum;
		}
	},
	
	sliderChange: function(value) {
		//dojo.byId(this.name + "TextBox").value = value;
		this.textBox.setValue(value);
		this.onChange();
	},
	
	buildTextBox: function() {
		this.textBoxContainer = dojo.create("input", {type: "text"}, this.container);
		this.textBox = new dijit.form.NumberTextBox({
			id: this.name + "TextBox",
			name: this.name + "TextBox",
			value: this.value,
			onChange: dojo.hitch(this, this.textBoxChange),
			intermediateChanges: true,
			constraints: {
				min: this.minimum,
				max: this.maximum
			}
		}, this.textBoxContainer);
		dojo.create("label", {for: this.name + "TextBox", innerHTML: this.parameterName, class: "rvParameterLabel"}, this.container);
	},
	
	textBoxChange: function(value) {
		this.slider.setValue(value);
		this.onChange();
	},
	
	linkInputs: function() {
	
	}
	
});