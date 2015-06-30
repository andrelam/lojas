var path = require('path');
var fs   = require('fs');

module.exports = function(app) {

	// 'require' all of our routes
	var routes = __dirname + '/routes';
	fs.readdirSync(routes).forEach(function(route) {
		if(route.indexOf('.js') > -1) {
			require(routes + '/' + route)(app);
		}
	});

};

