# Lojas Maçônicas

Controle e cadastro de Lojas Maçônicas

# Configuração

Após copiar o código, crie o arquivo config/secret.js conforme abaixo:

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

Inclua também seus certificados na pasta sslcerts, e altere o nome dos mesmos no arquivo server.js.
