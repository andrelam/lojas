var express = require('express');
var jwt     = require('jsonwebtoken');
var path    = require('path');
var fs      = require('fs');

var User    = require('./models/user.js');

module.exports = function(app) {

	var api = express.Router();

	api.get('/', function(req, res) {
		res.status(401).json({message: 'access denied'});
	});

	/*	api.post('/setup', function(req, res) {
		var _user = new User();
		_user.email    = 'macom@andrelam.com.br';
		_user.password = _user.generateHash('3Renate4');
		_user.save();
		res.send({ success: true, user: _user });
	}); */
	
	api.post('/authenticate', function(req, res) {
		if (req.body.email && req.body.password) {
			User.findOne({ email: req.body.email.toLowerCase() }, function(err, user) {
				if (err) {
					res.status(400).json({ success: false, message: 'Error while finding user', data: err });
				} else {
					if (!user) {
						res.status(401).json({ success: false, message: 'User not found', data: { } });
					} else {
						if (!user.role.active) {
							res.status(403).json({ success: false, message: 'User is deactivated', data: { } });
						} else {
							if (user.validPassword(req.body.password)) {
								var token = jwt.sign(user, app.get('jsonkeysecret'), { expireInMinutes: 60 });
								res.status(200).json({ success: true, message: 'Logged in', token: token });
							} else {
								res.status(401).json({ success: false, message: 'Incorrect email or password', data: { } });
							}
						}
					}
				}
			});
		} else {
			res.status(400).json({ success: false, message: 'User data not found', data: { } });
		}
	});

/*	api.use(function(req, res, next) {
		var token = req.body.token || req.query.token || req.headers['x-access-token'];
		
		if (token) {
			jwt.verify(token, app.get('jsonkeysecret'), function(err, decoded) {
				if (err) {
					return res.json(498, { success: false, message: 'Failed to authenticate token'} );
				} else {
					req.user = decoded;
					next();
				}
			});
		} else {
			return res.json(499, { success: false, message: 'Token required' });
		}
	});
*/
	// 'require' all of our routes
	var routes = __dirname + '/api';
	fs.readdirSync(routes).forEach(function(route) {
		if(route.indexOf('.js') > -1) {
			require(routes + '/' + route)(api);
		}
	});

	app.use('/api', api);

};
