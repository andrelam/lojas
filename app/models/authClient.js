// load the things we need
var ENV = process.env.NODE_ENV || 'dev'; // Assume dev env. for safety

var mongoose     = require('mongoose');
var secretConfig = require('../../config/secret')[ENV];
var crypt        = require('../helper/crypt');

// Define our client schema
var AuthClientSchema = new mongoose.Schema({
	name  : { type: String, unique: true, required: true },
	id    : { type: String, required: true },
	secret: { type: String, required: true },
	userId: { type: String, required: true }
}, { collection: 'AuthClient' });


AuthClientSchema.methods = {
	decodeId: function() {
		return crypt.decrypt(this.id, secretConfig.hash.id);
	},
	decodeSecret: function() {
		return crypt.decrypt(this.secret, secretConfig.hash.secret);
	},
	generateId: function() {
		return crypt.encrypt(crypto.randomBytes(64).toString('hex'), secretConfig.hash.id);
	},
	generateSecret: function() {
		return crypt.encrypt(crypto.randomBytes(64).toString('hex'), secretConfig.hash.secret);
	},
	encodeId: function(id) {
		return crypt.encrypt(id, secretConfig.hash.id);
	},
	encodeSecret: function(secret) {
		return crypt.encrypt(secret, secretConfig.hash.secret);
	}
};

AuthClientSchema.virtual('id.decoded').get(function() {
	return this.decodeId();
});

AuthClientSchema.virtual('secret.decoded').get(function() {
	return this.decodeSecret();
});

// create the model for authorization clients and expose it to our app
module.exports = mongoose.model('AuthClient', AuthClientSchema);
