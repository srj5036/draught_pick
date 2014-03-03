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
	console.log(req.query);

	ba.beerPage(req.query.q, function(response) {
		baData =response[0];

		console.log(baData);

		// Populate object to be returned
		returnData = new Object();
		returnData.brewery_name = baData.brewery_name;
		returnData.beer_name = baData.beer_name;
		returnData.ba_score = baData.ba_score;

		console.log("returnData: " + returnData);
		/*
		var url = "http://api.brewerydb.com/v2/search?key=c6343da45bea734e743c5da939d5e649&q=" + encodeURIComponent(baData.brewery_name + baData.beer_name) + "&type=beer";

		console.log("BreweryDB Request: " + url);

    	request(url, function (error, response, body) {

    		var breweryDbData = JSON.parse(body);

    		console.log(breweryDbData.data[0]);

			res.send(returnData);

    	});
		*/

		res.send(returnData);
	});
}