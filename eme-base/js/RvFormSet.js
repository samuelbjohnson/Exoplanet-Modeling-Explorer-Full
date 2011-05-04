dojo.provide("org.exoplanets.eme.js.RvFormSet");

dojo.require("dijit.layout.ContentPane");
dojo.require("dijit.layout.AccordionContainer");
dojo.require("dijit.layout.TabContainer");

dojo.declare("org.exoplanets.eme.js.RvFormSet", null, {
	constructor: function(/*node*/ containerNode) {
		this.container = containerNode;
		dojo.addClass(this.container, "rvFormSet");
		
		this.buildAccordion();
	},
	
	buildAccordion: function() {
		this.accordion = new dijit.layout.TabContainer({style: "height: 300px, width: 200px"}, this.container);
		
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
	}
});