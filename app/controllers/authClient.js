// Load required packages
var Client = require('../models/authClient');

// Create endpoint /api/authClient for POST
exports.postAuthClient = function(req, res) {
	// Create a new instance of the Client model
	var client = new Client();

	// Set the client properties that came from the POST data
	client.name   = req.body.name;
	client.id     = client.generateId();
	client.secret = client.generateSecret();
	client.userId = req.user._id;

	// Save the client and check for errors
	client.save(function(err) {
		if (err) {
			res.json(400, { success: false, message: 'Error adding authentication cliente', data: err });
		} else {
			res.json(200, { success: true, message: 'Authentication Client added', data: client });
		}
	});
};

// Create endpoint /api/authClients for GET
exports.getAuthClients = function(req, res) {
	// Use the Client model to find all clients
	Client.find({ userId: req.user._id }, function(err, clients) {
		if (err) {
			res.json(400, { success: false, message: 'Error getting authentication clients', data: err });
		} else {
			res.json(200, { success: true, message: 'Authentication clients found', data: clients });
		}
	});
};
