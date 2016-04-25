var express = require('express');
var compression = require('compression');
var consolidate = require('consolidate');
var prerender = require('prerender-node');
var app = express();

var oneWeek = 86400000*7;
var PORT = 9000;

app.use(compression());
app.use(prerender.set('prerenderToken', '1OBZPUzitdL2GaU1IiZZ'));

app.set('view engine', 'html');
app.set('views', __dirname + '/frontend/dist');
app.engine('html', consolidate.mustache);

app.get('/', function(req, res, next) {
  res.render('index', {
    title: "Hire Elite Fulltime Developers Overseas",
    subTitle: "Let us know your requirement, we will find the right developers for you from our fully-vetted network in South East Asia. Hands-off, we'll run their payroll and manage the local office. They focus on delivery. You focus on management.",
    canDisplayBtn: true
  });
});

app.use(express.static(__dirname + '/frontend/dist', { maxAge: oneWeek }));

// app.get('/our-services', function(req, res, next) {
//   res.render('index', {
//     title: "Our Services"
//   });
// });

app.get('/about-us', function(req, res, next) {
  res.render('index', {
    title: "About Us"
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