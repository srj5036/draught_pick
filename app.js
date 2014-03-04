
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var beer = require('./routes/beer');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// Get Rotten Tomatoes seach results
app.get('/search', beer.searchBeer);

// Get beer info
app.get('/beer/:id', beer.getBeer);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
