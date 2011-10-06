dojo.provide("org.exoplanets.eme.js.science.Utils");

dojo.require("org.exoplanets.eme.js.science.Limits");

dojo.declare("org.exoplanets.eme.js.science.Utils", null, {

	constructor: function() {
		this.messages = "";
	},
	
	isArray: function(value) {
		var typeString, isArray;
		typeString= Object.prototype.toString.apply(value);
		isArray = typeString === '[object Array]';
		
		return isArray;
	}, 
	
	/*
		Constructs an array containing a boolean value reflecting whether each value of the input array is between lowerEndpoint and upperEndpoint.
		
		The limits parameter changes the endpoint properties.
	*/
	within: function(/*array*/ data, /*number*/lowerEndpoint, /*number*/upperEndpoint, lims) {
		var limits, outputArray;
		
		if (! lims) {
			lims = {};
		}
		
		limits = new org.exoplanets.eme.js.science.Limits(lowerEndpoint, upperEndpoint, lims);
		
		if (! this.isArray(data)) {
			return limits.checkBoundsOf(data);
		}
		
		outputArray = new Array();
		
		dojo.forEach(data, function(item) {
			outputArray.push(limits.checkBoundsOf(item));
		});
		
		return outputArray;		
	},
	
	restrict: function(/*array*/ data, /*number*/ lowerEndpoint, /*number*/ upperEndpoint, lims) {
		var outputArray, limits;
		
		if (! lims) {
			lims = {};
		}
		
		limits = new org.exoplanets.eme.js.science.Limits(lowerEndpoint, upperEndpoint, lims);
		
		if (! this.isArray(data)) {
			return limits.putWithinBounds(data);
		}
		
		outputArray = new Array();
		
		dojo.forEach(data, function(item) {
			outputArray.push(limits.putWithinBounds(item));
		});
		
		return outputArray;
		
	},
	
	kepler: function(inM, inecc) {
		var conv, k, mphase, ssm, count, E, fi, fip, fipp, fippp, d1, d2, d3;
	   conv = 1e-12;
	   k = .85;
	   mphase = this.restrict([inM / (2 * Math.PI)], 0, 1);
	   ssm = (mphase <= .5) - ((mphase >= .5) || (mphase == 0));
	   count = 0;
	   E = inM + ssm * k * inecc;
		fi = 1;
		
		while ( (Math.abs(fi) > conv) && (count < 100) ) {
			count += 1;
			fi = (E - inecc * Math.sin(E) - inM);
			fip = 1 - inecc * Math.cos(E);
			fipp = inecc * Math.sin(E);
			fippp = 1 - fip;
			
			d1 = -fi/fip;
			d2 = -fi/(fip + d1 * fipp / 2);
			d3 = -fi/(fip + d2 * fipp / 2 + d2 * d2 * fippp / 6);
			
			E = E + d3;
			fi = (E - inecc * Math.sin(E) - inM);
			
		}
		
		if (count == 100) {
			this.messages = "Kepler equation not solved";
		} else {
			this.messages = "";
		}
		
		return E;
	},
	
	rv_drive: function(t, orbels) {
		var rv = 0;
		
		dojo.forEach(orbels, dojo.hitch(this, function(orbel, i) {
			var P, tp, e, om, k, gamma, dvdt, curv, M, E1;
			var n1, n2, nu;
			
			P = orbel.P;
			tp = orbel.tp;
			e = orbel.e;
			om = orbel.om * (Math.PI / 180);
			k = orbel.k;
			gamma = orbel.cmvel;
			dvdt = orbel.dvdt;
			curv = 0;
			
			if (P < 0) {
				P = .01;
			}
			if (e < 0) {
				e = 0;
			}
			if (e >= 1) {
				e = .99;
			}
			if (k < 0) {
				k = .01;
			}
			
			M = 2 * Math.PI * (((t - tp) / P) - Math.floor((t - tp) / P));
			E1 = this.kepler(M, e);
			n1 = 1 + e;
			n2 = 1 - e;
			nu = 2 * Math.atan(Math.pow((n1/n2), .5)* Math.tan(E1/2));
			
		    rv += k*(Math.cos(nu + om) + e * Math.cos(om)) + gamma + dvdt * (t-14000) + curv * Math.pow((t-14000), 2);
		}));
		
		return rv;
	}
	
});