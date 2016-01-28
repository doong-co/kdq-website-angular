var express = require('express');
var compression = require('compression');

var app = express();

var oneDay = 86400000;

app.use(compression());

app.use(express.static('./frontend/dist', { maxAge: oneDay }));

app.listen(9000);