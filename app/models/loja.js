// load the things we need
var mongoose = require('mongoose');

var ObjectId = mongoose.Schema.Types.ObjectId;

// define the schema for our user model
var lojaSchema = mongoose.Schema({
	titulo          : { type: String, required: true },
	nome            : { type: String, required: true, unique: true },
	numero          : { type: Number, required: true },
	tipo            : { type: String, enum: ['Simbólica', 'Perfeição', 'Capítulo', 'Kadosh', 'Consistório'], required: true },
	obediencia      : { type: String },
	admin           : { type: ObjectId, ref: 'Users' },
	ativa           : { type: Boolean, default: true },
	membros         : [ {
		irmao       : { type: ObjectId, ref: 'Irmaos' },
		ativo       : { type: Boolean, default: true } }
	],
	dados           : {
		cnpj        : { type: String },
		dataFundacao: { type: Date }
	},
	endereco    : [{
		tipo       : { type: String },
		rua        : { type: String },
		numero     : { type: String },
		complemento: { type: String },
		bairro     : { type: String },
		cidade     : { type: String },
		estado     : { type: String },
		cep        : { type: String },
		tempo      : { type: String }
	}]
}, { collection: 'Loja' });

lojaSchema.virtual('arls').get(function() {
	return this.titulo + ' ' + this.nome;
});

lojaSchema.virtual('arlsnro').get(function() {
	return this.titulo + ' ' + this.nome + ', ' + this.numero.toString();
});

lojaSchema.set('toJSON', { getters: true, virtuals: true });

// create the model for users and expose it to our app
var Loja = mongoose.model('Lojas', lojaSchema);

module.exports = Loja;
