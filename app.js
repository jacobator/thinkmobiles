var express = require('express');
var path = require('path');
var routes = require('./routes');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost/thinkmobiles')

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', routes.views.index);
app.use('/api', routes.api.people);
app.use('/api', routes.api.customers);


app.listen(3000, function() {
	console.log('listening on port 3000');
});