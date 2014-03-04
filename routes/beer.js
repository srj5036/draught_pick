var ba = require('beer-advocate-api');
var request = require('request')

exports.searchBeer = function(req, res) {
	
	var url = "http://api.brewerydb.com/v2/search?key=c6343da45bea734e743c5da939d5e649&q=" + req.query.q + "&type=beer";

	console.log("BreweryDB Request: " + url);

	request(url, function (error, response, body) {

		var breweryDbData = JSON.parse(body);

		console.log(body);

		res.send(body);

	});

	/*ba.beerSearch(req.query.q, function(beers) {

    	console.log(req.query.q);

    	res.send(beers);
    });*/
}

exports.getBeer = function(req, res) {
	console.log(req.params.id);

	var url = "http://api.brewerydb.com/v2/beer/" + req.params.id + "?key=c6343da45bea734e743c5da939d5e649";

	console.log("BreweryDB Request: " + url);

	request(url, function (error, response, body) {

		var breweryDbData = JSON.parse(body);

		console.log(breweryDbData.data);

		res.send(breweryDbData.data);

	});	

}