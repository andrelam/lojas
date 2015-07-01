// config/secret.js
module.exports = {

    'dev': {
		secret: {
			secret: 'secret',
			resave: true,
			saveUninitialized: true,
			cookie: {
				httpOnly: true,
				secure  : true
			}
		},
		hash: {
			secret: 'secret',
			id    : 'secret',
			value : 'secret'
		}
    },
    'prod': {
		secret: {
			secret: 'secret',
			resave: true,
			saveUninitialized: true,
			cookie: {
				httpOnly: true,
				secure  : true
			}
		},
		hash: {
			secret: 'secret',
			id    : 'secret',
			value : 'secret'
		}
    }

};