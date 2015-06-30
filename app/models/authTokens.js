// load the things we need
var ENV = process.env.NODE_ENV || 'dev'; // Assume dev env. for safety

var mongoose     = require('mongoose');
var secretConfig = require('../../config/secret')[ENV];
var crypt        = require('../helper/crypt');

// Define our client schema
var AuthTokenSchema = new mongoose.Schema({
	value   : { type: String, required: true },
	clientId: { type: String, required: true },
	userId  : { type: String, required: true }
}, { collection: 'AuthToken' });


AuthTokenSchema.methods = {
	decodeValue: function() {
		return crypt.decrypt(this.value, secretConfig.hash.value);
	},
	generateValue: function() {
		return crypt.encrypt(crypto.randomBytes(64).toString('hex'), secretConfig.hash.value);
	},
	encodeValue: function(value) {
		return crypt.encrypt(value, secretConfig.hash.value);
	}
};

AuthTokenSchema.virtual('value.decoded').get(function() {
	return this.decodeValue();
});

// create the model for authorization clients and expose it to our app
module.exports = mongoose.model('AuthToken', AuthTokenSchema);
