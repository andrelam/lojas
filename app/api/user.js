var User       = require('../models/user');
var controller = require('../controllers/user');
var auth       = require('../controllers/auth');

module.exports = function(api) {

	api.route('/users')
		.get(auth.isAuthenticated, controller.getUsers);
		
	api.route('/user')
		.post(auth.isAuthenticated, controller.postUser);

	api.route('/user/:user_id')
		.get(auth.isAuthenticated, controller.getUser)
		.put(auth.isAuthenticated, controller.putUser)
		.delete(auth.isAuthenticated, controller.deleteUser);

};
