// config/secret.js
module.exports = {

    'dev': {
		secret: {
			secret: 'esquadroecompasso',
			resave: true,
			saveUninitialized: true,
			cookie: {
				httpOnly: true,
				secure  : true
			}
		},
		hash: {
			secret: 'esquadroecompasso',
			id    : 'esquadroecompasso',
			value : 'esquadroecompasso'
		}
    },
    'prod': {
		secret: {
			secret: 'meusirmaoscomotalmereconhecem',
			resave: true,
			saveUninitialized: true,
			cookie: {
				httpOnly: true,
				secure  : true
			}
		},
		hash: {
			secret: 'meusirmaoscomotalmereconhecem',
			id    : 'meusirmaoscomotalmereconhecem',
			value : 'meusirmaoscomotalmereconhecem'
		}
    }

};