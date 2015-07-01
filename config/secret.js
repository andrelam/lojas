// config/secret.js
module.exports = {

    'dev': {
		secret: {
			secret: 'segredo',
			resave: true,
			saveUninitialized: true,
			cookie: {
				httpOnly: true,
				secure  : true
			}
		},
		hash: {
			secret: 'segredo',
			id    : 'segredo',
			value : 'segredo'
		}
    },
    'prod': {
		secret: {
			secret: 'segredo',
			resave: true,
			saveUninitialized: true,
			cookie: {
				httpOnly: true,
				secure  : true
			}
		},
		hash: {
			secret: 'segredo',
			id    : 'segredo',
			value : 'segredo'
		}
    }

};
