var restful = require('node-restful');
var mongoose = restful.mongoose;
var extend = require('mongoose-schema-extend');
var personSchema = require('./person').schema;

var customerSchema = personSchema.extend({
	companyName: String,
	phone: {
		mobile: String,
		work: String
	},
	skype: String
});

module.exports = {
	schema: customerSchema,
	model: restful.model('customer', customerSchema)
}