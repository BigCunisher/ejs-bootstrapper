var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var bodyParser = require('body-parser');
var rootDir = __dirname;

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.use('/static', express.static(__dirname + '/client/static'));

require('./app/routes')(app, rootDir);

app.listen(port);
console.log('The magic happens on port ' + port);
