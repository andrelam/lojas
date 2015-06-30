// controllers/auth.js
// Load required packages
var passport       = require('passport');
var BasicStrategy  = require('passport-http').BasicStrategy;
var User           = require('../models/user');
/*
var BearerStrategy = require('passport-http-bearer').Strategy;
var AuthClient     = require('../models/authClient');
var AuthToken      = require('../models/authToken');
*/

passport.use(new BasicStrategy(
	function(email, password, callback) {
		User.findOne({ email: email }, function (err, user) {
			if (err) { return callback(err); }

			// No user found with that username
			if (!user) { return callback(null, false); }

			// Make sure the password is correct
			user.verifyPassword(password, function(err, isMatch) {
				if (err) { return callback(err); }

				// Password did not match
				if (!isMatch) { return callback(null, false); }

				// Success
				return callback(null, user);
			});
		});
	}
));

/*
passport.use('client-basic', new BasicStrategy(
	function(email, password, callback) {
		Client.findOne({ id: Client.encodeId(email) }, function (err, user) {
			if (err) { return callback(err); }

			// No client found with that id or bad password
			if (!client || client.secret.decoded !== password) { return callback(null, false); }

			// Success
			return callback(null, client);

		});
	}
));

passport.use(new BearerStrategy(
	function(accessToken, callback) {
		AuthToken.findOne({value: AuthToken.encodeValue(accessToken) }, function (err, token) {
			if (err) { return callback(err); }

			// No token found
			if (!token) { return callback(null, false); }

			User.findOne({ _id: token.userId }, function (err, user) {
				if (err) { return callback(err); }

				// No user found
				if (!user) { return callback(null, false); }

				// Simple example with no scope
				callback(null, user, { scope: '*' });
			});
		});
	}
));
*/

exports.isAuthenticated       = passport.authenticate('basic', { session : false });
/*
exports.isClientAuthenticated = passport.authenticate('client-basic', { session: false });
exports.isBearerAuthenticated = passport.authenticate('bearer', { session: false });
*/

