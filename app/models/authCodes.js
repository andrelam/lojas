// load the things we need
var ENV = process.env.NODE_ENV || 'dev'; // Assume dev env. for safety

var mongoose = require('mongoose');
var secret   = require('../../config/secret')[ENV];
var crypt    = require('../helper/crypt');

// Define our client schema
var AuthCodeSchema = new mongoose.Schema({
	value      : { type: String, required: true },
	redirectUri: { type: String, required: true },
	userId     : { type: String, required: true },
	clientId   : { type: String, required: true }
}, { collection: 'AuthCodes' });


AuthCodeSchema.methods = {
	decodeValue: function() {
		return crypt.decrypt(this.value, secret.hash.value);
	},
	generateValue: function() {
		return crypt.encrypt(crypto.randomBytes(64).toString('hex'), secret.hash.value);
	},
	encodeValue: function(value) {
		return crypt.encrypt(value, secret.hash.value);
	}
};

AuthCodeSchema.virtual('value.decoded').get(function() {
	return this.decodeValue();
});

// create the model for authorization clients and expose it to our app
module.exports = mongoose.model('AuthCodes', AuthCodeSchema);
