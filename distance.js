function distance(lat1, lon1, lat2, lon2, unit) {

	// Decimal Degree to Radian
	var radlat1 = Math.PI * lat1/180;
	var radlat2 = Math.PI * lat2/180;

	// Get Theta
	var theta = lon1 - lon2;
	// Theta degree to radian
	var radtheta = Math.PI * theta/180;
	var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
	dist = Math.acos(dist);
	dist = dist * 180/Math.PI;
	dist = dist * 60 * 1.1515;
	if (unit=="K") {
		dist = dist * 1.609344;
	}
	if (unit=="N") {
		dist = dist * 0.8684;
	}
	return dist
}
function redis(list_postion, unit){
	var i = 0;
	var len = list_postion.length;
	var dist = 0;
	for(; i < len; i++) {
		if(list_postion[i+1] !== undefined){
			dist += distance(list_postion[i]['lat'], list_postion[i]['lng'], list_postion[i+1]['lat'], list_postion[i+1]['lng'], unit);
		}
	}
	return dist;
}
var list_postion = [
	{lat: 36.72373121590989, lng: 140.10301530361178},
	{lat: 36.72375056469924, lng: 140.1037395000458},
	{lat: 36.72373121590989, lng: 140.10301530361178},
];

var test = distance(36.72373121590989,
	140.10301530361178,
	36.72375056469924,
	140.1037395000458,
	'K');

var test2 = redis(list_postion,'K');