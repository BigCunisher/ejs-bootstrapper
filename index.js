var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var bodyParser = require('body-parser');
var config = require('./app/config/config')(__dirname);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', config.appConfig.templatingEngine);
app.use(config.routeConfig.staticURL, express.static(config.clientConfig.staticDir));

require('./app/routes')(app, config);

app.listen(port);
console.log('Server started on port ' + port);
