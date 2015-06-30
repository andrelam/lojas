// config/database.js

module.exports = {
    dev: {
        url: 'mongodb://localhost:27017/arls_dev',
		store: {
			db   : 'arls_session_dev',
			host : 'localhost',
			port : '27017'
		}
    },
    prod: {
        url: 'mongodb://localhost:27017/arls',
		store: {
			db   : 'arls_session',
			host : 'localhost',
			port : '27017'
		}
    }
};
