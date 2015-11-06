var restful = require('node-restful');
var mongoose = restful.mongoose;

var personSchema = new mongoose.Schema({
	name: {
		first: String,
		last: String
	},
	dateOfBirth: Date
});

module.exports = {
	schema: personSchema,
	model: restful.model('person', personSchema)
}