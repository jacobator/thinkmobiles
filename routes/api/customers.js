var express = require('express');
var router = express.Router();

var Customer = require('../../models/customer').model;

Customer.methods(['get', 'put', 'post', 'delete']);
Customer.register(router, '/customers');

module.exports = router;