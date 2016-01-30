var express = require('express');
var compression = require('compression');
var livereload = require('connect-livereload');

var app = express();

var oneDay = 86400000;
var PORT = 9000;

app.use(compression());
app.use(livereload());

app.use(express.static(__dirname + '/frontend', { maxAge: oneDay }));
app.use(express.static(__dirname + '/frontend/app', { maxAge: oneDay }));
app.use(express.static(__dirname + '/frontend/.tmp', { maxAge: oneDay }));
app.use(express.static(__dirname + '/frontend/bower_components', { maxAge: oneDay }));

app.all('/*', function(req, res, next) {
  res.sendFile('index.html', { root: __dirname + '/frontend/app' });
});

app.listen(PORT, function() {
  console.log('Express server listening on port ' + PORT);
});