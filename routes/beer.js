var ba = require('beer-advocate-api');
var request = require('request')

exports.searchBeer = function(req, res) {
	console.log('Name: ' + req.query.name);
	console.log('UPC: ' + req.query.upc);

	if (req.query.name !== undefined)
	{
		var url = "http://api.brewerydb.com/v2/search?key=c6343da45bea734e743c5da939d5e649&q=" + req.query.name + "&type=beer";

		console.log("BreweryDB Request: " + url);

		request(url, function (error, response, body) {

			var breweryDbData = JSON.parse(body);

			console.log(JSON.stringify(breweryDbData, undefined, 2));

			res.send(body);

		});
	}
	else if (req.query.upc !== undefined)
	{
		var url = "http://api.brewerydb.com/v2/search/upc?key=c6343da45bea734e743c5da939d5e649&code=" + req.query.upc + "&type=beer";

		console.log("BreweryDB Request: " + url);

		request(url, function (error, response, body) {

			var breweryDbData = JSON.parse(body);

			console.log(JSON.stringify(breweryDbData, undefined, 2));

			res.send(body);

		});
	}
}

exports.getBeer = function(req, res) {
	console.log(req.params.id);

	var returnData = new Object();
	var url = "http://api.brewerydb.com/v2/beer/" + req.params.id + "?key=c6343da45bea734e743c5da939d5e649&withBreweries=Y";

	console.log("BreweryDB Request: " + url);

	request(url, function (error, response, body) {

		var breweryDbData = JSON.parse(body);

		breweryDbData = breweryDbData.data;

		console.log(breweryDbData);

		ba.beerSearch(breweryDbData.name, function(beers) {

	    	console.log(breweryDbData.name);

	    	console.log(beers);

	    	// Assume first result on BA is the correct beer
	    	ba.beerPage(beers[0].beer_url, function(baData) {

				console.log(baData);

				returnData.name = breweryDbData.name;
				returnData.brewery = breweryDbData.breweries[0].name;
				returnData.style = breweryDbData.style.name;
				returnData.description = breweryDbData.description;
				returnData.abv = breweryDbData.abv;
				returnData.ibu = breweryDbData.ibu;
				returnData.ba_score = baData[0].ba_score;
				returnData.ba_ratings = baData[0].ratings;

				res.send(returnData);
			});

	    });

	});	

}