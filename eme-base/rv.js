var newOrbels = function(P,tp,e,om,k,cmvel,dvdt)
/*
Basic "constructer" for a rudimentary orbital elements object.
In the future something like this would hold all parameters for a planet
and ensure that they remain related to each other properly.
*/
{	
    if (!cmvel) cmvel=0;
    if (!dvdt) dvdt=0;
	return{P:P,tp:tp,e:e,om:om,k:k,cmvel:cmvel,dvdt:dvdt};
}

var within = function(arr,inmin,inmax,lims)
/*
returns boolean array the size of input array arr that is true when between 
inmin and inmax.  or if arr is just a value, then it returns a single bool

The optional lims parameter changes the endpoint properties (defaults to zero):
0: []
1: (]
2: [)
3: ()
*/
{

	if (inmin > inmax)
	{
		var minval = inmax;
		var maxval = inmin;
	}
	else
	{
		var minval = inmin;
		var maxval = inmax;
	}

	//default value for lims
	if (!lims)
		lims = 0

	if (lims % 2 == 1)
		iter1 = function(num){return (num > minval)}
	else
		iter1 = function(num){return (num >= minval)}
	if (Math.floor(lims / 2) == 1)
		iter2 = function(num){return (num < maxval)}
	else
		iter2 = function(num){return (num <= maxval)}
	
	iterboth = function(num){return (iter1(num) && iter2(num))}

	if (arr instanceof Array)
		return _.map(arr,function(num){return iterboth(num)})
	else
		return iterboth(arr)
}

var restrict = function(data,inmin,inmax,lims)
/*
restricts array to be between inmin and inmax (endpoint properties determined by lims)
works for either an array or a single value

The optional lims parameter changes the endpoint properties (defaults to zero):
0: []
1: (]
2: [)
3: ()
*/
{
	//default value for lims
	if (!lims)
		lims = 0

	var minval = inmin*1.;
	var maxval = inmax*1.;
	var valrange = maxval-minval;
	
	for (var i=0; i<data.length; ++i)
	{
		var val = data[i]
		while(!within(val,minval,maxval,lims) && (val != Infinity))
		{
			var sval = Math.abs(val-minval)/valrange;
			var shiftmag = valrange*(2*(val < maxval)-1);
			val += shiftmag
		}
		data[i] = val;
	}
	document.write('<br>')
	return data
}

var kepler = function(inM,inecc)
/* Iteratively solve for E (anomaly) given M (mean anomaly) and e (eccentricity)
    written by JTW at Berkeley
    Adopted for TEDI Dec 2007
    From Murray & Dermott p. 35, from Danby (1988)

    ported to javascript by TDM, March 2010
*/
{
	var M = inM;
	var ecc = inecc;
	var conv = 1e-12;
	var k = 0.85;
	var mphase = restrict(inM/2./Math.PI,0,1);
	var ssm = (mphase <= 0.5) - ((mphase >= 0.5) || (mphase==0)); 
	var count = 0;
	var E = M + ssm*k*ecc;
	var fi = 1;
	while ((Math.abs(fi) > conv) && (count < 100))
	{
		count += 1
		fi = (E-ecc*Math.sin(E)-M);
		var fip = 1-ecc*Math.cos(E);
		var fipp = ecc*Math.sin(E);
		var fippp = 1-fip;

		
		var d1 = -fi/fip;
		var d2 = -fi/(fip+d1*fipp/2.);
		var d3 = -fi/(fip+d2*fipp/2.+d2*d2*fippp/6.);
		
		var E = E+d3;
		fi = (E-ecc*Math.sin(E)-M);
		if (count == 100)
			document.write('WARNING!  Kepler equation not solved!!!');
	}
	return E;
}

var rv_drive = function(t,orbels)
/*
Returns the radial velocity of a system with a list of orbital elements 'orbels' at time 't'.
*/
{
	var rv = 0
	for(var i=0; i < orbels.length; ++i)
	{
		var orbel = orbels[i]
		var P = orbel.P
		var tp = orbel.tp
		var e = orbel.e
		var om = orbel.om
		var k = orbel.k
		var gamma = orbel.cmvel
		var dvdt = orbel.dvdt
		var curv = 0  //how to set curvature?

		//error checking
		if (P<0) P = 0.01;
		if (e<0) e = 0;
		if (e>=1) e = 0.99;
		if (k<0) k = 0.01
		
		//calculate the approximate eccentric anomaly, E1, via the mean anomaly M
		M = 2*Math.PI*(((t-tp)/P) - Math.floor((t-tp)/P))
		var E1 = kepler(M,e)
		 //caculate nu
		 var n1 = 1+e
		 var n2 = 1-e
		 var nu = 2*Math.atan(Math.pow((n1/n2),0.5)*Math.tan(E1/2))
		 
		 rv += k*(Math.cos(nu+om)+e*Math.cos(om))+gamma+dvdt*(t-14000)+curv*Math.pow((t-14000),2)
	}
	return rv
}

defaultOrbel = newOrbels(10,0,0.3,0,20);
//document.write(rv_drive(3,[defaultOrbel]))
