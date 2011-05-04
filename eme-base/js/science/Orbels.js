dojo.provide("org.exoplanets.eme.js.science.Orbels");

dojo.declare("org.exoplanets.eme.js.science.Orbels", null, {

	/*
		The args object can define the following fields:
		
			p: period,
			tp: time of periastron,
			e: eccentricity of the orbit,
			om: omega?,
			k: radial velocity semi-amplitude,
			cmvel: center of mass velocity of the host star,
			dvdt: slope of the rv curve
			
		All fields are assumed to be floating point values
	*/
	constructor: function(args) {
		this.__proto__ = dojo.mixin(
			{P: 10, tp: 0, e: 0, om: 0, k: 20, cmvel: 0, dvdt: 0},
			args
		);
	}
});