var express = require('express');
var router = express.Router();

var Person = require('../../models/person').model;

Person.methods(['get', 'put', 'post', 'delete']);
Person.register(router, '/people');

module.exports = router;