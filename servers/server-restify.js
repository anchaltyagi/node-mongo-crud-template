var restify = require('restify');
var app = restify.createServer();
var groceryRoutes = require('../routes/grocery');
var config = require('../config.json');

app.use(restify.acceptParser(app.acceptable));
app.use(restify.queryParser());
app.use(restify.bodyParser());

groceryRoutes(app, config);

app.listen(3000, function () {
  console.log('%s listening at %s', app.name, app.url);
});