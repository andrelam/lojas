var controller = require('../controllers/loja');
var auth       = require('../controllers/auth');

module.exports = function(api) {

	api.route('/lojas')
		.get(auth.isAuthenticated, controller.getLojas);
		
	api.route('/loja')
		.post(auth.isAuthenticated, controller.postLoja);

	api.route('/loja/:loja_id')
		.get(auth.isAuthenticated, controller.getLoja)
		.put(auth.isAuthenticated, controller.putLoja)
		.delete(auth.isAuthenticated, controller.deleteLoja);

};
