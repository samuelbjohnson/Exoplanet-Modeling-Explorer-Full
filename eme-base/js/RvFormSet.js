dojo.provide("org.exoplanets.eme.js.RvFormSet");

dojo.require("dijit.layout.ContentPane");
dojo.require("dijit.layout.AccordionContainer");

dojo.declare("org.exoplanets.eme.js.RvFormSet", null, {
	constructor: function(/*node*/ containerNode) {
		this.container = containerNode;
		dojo.addClass(this.container, "rvFormSet");
		
		this.buildAccordion();
	},
	
	buildAccordion: function() {
		this.accordion = new dijit.layout.AccordionContainer({}, this.container);
		
		this.planetModels = new Array();
		this.planetModel
		
		
		this.accordion.addChild(new dijit.layout.ContentPane({
			title: "First", 
			content: '<div id="first">First</div>',
			closable: true,
			onClose: function() {
				return true;
			}
		}));
		this.accordion.addChild(new dijit.layout.ContentPane({title: "Second", content: '<div id="second">Second</div>'}));
		
		this.accordion.startup();
	},
	
	addNewRvForm: function() {
		var planet, pane;
		
		pane = new dijit.layout.ContentPane
	}
});