var Irmao      = require('../models/irmao');
var controller = require('../controllers/irmao');
var auth       = require('../controllers/auth');

module.exports = function(api) {

	api.route('/irmaos')
		.get(auth.isAuthenticated, controller.getIrmaos);

	api.route('/irmaos/:loja_id')
		.get(auth.isAuthenticated, controller.getIrmaosPorLoja);
		
	api.route('/irmao/:loja_id')
		.post(auth.isAuthenticated, controller.postIrmao);

	api.route('/irmao/:irmao_id')
		.get(auth.isAuthenticated, controller.getIrmao)
		.put(auth.isAuthenticated, controller.putIrmao)
		.delete(auth.isAuthenticated, controller.deleteIrmao);

};
