dojo.provide("org.exoplanets.eme.js.science.Limits");

dojo.declare("org.exoplanets.eme.js.science.Limits", null, {
	constructor: function(lowerEndpoint, upperEndpoint, lims) {
	
		this.lowerEndpoint = lowerEndpoint;
		this.upperEndpoint = upperEndpoint;
		
		/* Set Lower Bounds Function */
		if (lims.excludeLower) {
			this.lowerBoundOkay = function(num) {
				return num > lowerEndpoint;
			};
		} else {
			this.lowerBoundOkay = function(num) {
				return num >= lowerEndpoint;
			};
		}
		
		/* Set Upper Bound Function */
		if (lims.excludeUpper) {
			this.upperBoundOkay = function(num) {
				return num < upperEndpoint;
			};
		} else {
			this.upperBoundOkay = function(num) {
				return num <= upperEndpoint;
			};
		}
	},
	
	checkBoundsOf: function(value) {
		return this.lowerBoundOkay(value) && this.upperBoundOkay(value);
	},
	
	putWithinBounds: function(value) {
		var valrange = this.upperEndpoint - this.lowerEndpoint;
		while( (! this.checkBoundsOf(value)) && (value != Infinity) ) {
			value += valrange * (2 * (value < this.upperEndpoint) - 1);
		}
		return value;
	}
});
