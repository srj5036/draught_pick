var ba = require('beer-advocate-api');
var request = require('request')

exports.searchBeer = function(req, res) {
	ba.beerSearch(req.query.q, function(beers) {

    	console.log(req.query.q);

    	res.send(beers);
    });
}

exports.getBeer = function(req, res) {
	console.log(req.query);

	ba.beerPage(req.query.q, function(response) {
		beer =response[0];

		console.log(beer);

		var url = "http://api.brewerydb.com/v2/search?key=c6343da45bea734e743c5da939d5e649&q=" + encodeURIComponent(beer.brewery_name + beer.beer_name) + "&type=beer";

		console.log(beer.brewery_name);

		console.log("BreweryDB Request: " + url);

    	request(url, function (error, response, body) {

    		var breweryDBdata = JSON.parse(body);

    		console.log(breweryDBdata.data[0]);

			res.send(beer);

    	});
	
	});
}