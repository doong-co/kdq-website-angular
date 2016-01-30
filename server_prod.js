var express = require('express');
var compression = require('compression');

var app = express();

var oneDay = 86400000;
var PORT = 9000;

app.use(compression());

app.use(express.static(__dirname + '/frontend/dist', { maxAge: oneDay }));

app.all('/*', function(req, res, next) {
  res.sendFile('index.html', { root: __dirname + '/frontend/dist' });
});

app.listen(PORT, function() {
  console.log('Express server listening on port ' + PORT);
});