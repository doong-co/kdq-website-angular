var express = require('express');
var compression = require('compression');
var consolidate = require('consolidate');

var app = express();

var oneWeek = 86400000*7;
var PORT = 9000;

app.use(compression());

app.set('view engine', 'html');
app.set('views', __dirname + '/frontend/dist');
app.engine('html', consolidate.mustache);

app.get('/', function(req, res, next) {
  res.render('index', {
    title: "SOLID offshore front-end development",
    subTitle: "Our model heavily leverages long-term partnerships. You can count on us for on-time, on-budget delivery, and awesome products.",
    canDisplayBtn: true
  });
});

app.use(express.static(__dirname + '/frontend/dist', { maxAge: oneWeek }));

app.get('/our-services', function(req, res, next) {
  res.render('index', {
    title: "Services",
    subTitle: "We have our developers working and communicating directly with our clients’ engineering team. We use Agile processes and professional tools such as Jira and Slack to keep track of development progress and better collaborate with our clients."
  });
});

app.get('/about-us', function(req, res, next) {
  res.render('index', {
    title: "About us"
  });
});

app.get('/404', function(req, res, next) {
  res.render('index', {
    title: "ERROR 404",
    subTitle: "It's looking like you may have taken a wrong turn.<br>Don't worry... It happens to the best of us."
  });
});

app.all('/*', function(req, res, next) {
  res.redirect('/404');
});

app.listen(PORT, function() {
  console.log('Express server listening on port ' + PORT);
});