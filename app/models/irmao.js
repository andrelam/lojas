// load the things we need
var mongoose = require('mongoose');

var ObjectId = mongoose.Schema.Types.ObjectId;

// define the schema for our irmao model
var irmaoSchema = mongoose.Schema({
	email           : { type: String, required: true, unique: true, match: [ /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address' ] },
	perfil          : {
		nome        : { type: String },
		apelido     : { type: String },
		dataNasc    : { type: Date },
		estadoCivil : { type: String },
		grauInstr   : { type: String },
		foto        : { type: String, default: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAAAAACPAi4CAAAACXBIWXMAAABIAAAASABGyWs+AAAACXZwQWcAAABAAAAAQADq8/hgAAAEaElEQVRYw82X6XLbNhCA+f4PVomk5MRyHDtp63oEgDcl3vfRBQhQIEVKSvsnO+OxRBEfFnthV+n/pyi/NaCryzzL8rJu/wOgzQPXJBgjhDExnXPW/Aqgy30DI0yIwYQQ4Bhe2j0I6BIbI1jL9meC2TdkRu0jgMxCGN5H2HT8IIzjKPAdE9NngEjuAhqfv3rOpe3aIrDAFoB1qtuA3ADlMXKuz9vlLqZokt4CxPAOQXa2bPDCRVSJYB0QIDA4ibp+TVKDbuCvAeh6YpX9DWkcUGJCkAARXW9UfXeL0PmUcF4CZBA4cALv5nqQM+yD4mtATQMOGMi9RzghiKriCuBiAzsB1e8uwUUGtroZIAEsqfqHCI2JjdGZHNDSZzHYb0boQK4JOTVXNQFEoJXDPskEvrYTrJHgIwOdZEBrggXzfkbo+sY7Hp0Fx9bUYbUEAAtgV/waHAcCnOew3arbLy5lVXGSXIrKGQkrKKMLcnHsPjEGAla1PYi+/YCV37e7DRp1qUDjwREK1wjbo56hezRoPLxt9lzUg+m96Hvtz3BMcU9syQAxKBSJ/c2Nqv0Em5C/97q+BdGoEuoORN98CkAqzsAAPh690vdv2tOOEcx/dodP0zq+qjpoQQF7/Vno2UA0OgLQQbUZI6t/1+BlRgAlyywvqtNXja0HFQ7jGVwoUA0HUBNcMvRdpW8PpzDPYRAERfmNE/TDuE8Ajis4oJAiUwB2+g+am3YEEmT5kz4HgOdRygHUIPEMsFf/YvXJYoSKbPczQI4HwysSbKKBdk4dLAhJsptrUHK1lSERUDYD6E9pGLsjoXzRZgAIJVaYBCCfA57zMBoJYfV9CXDigHhRgww2Hgngh4UjnCUbJAs2CEdCkl25kbou5ABh0KkXPupA6IB8fOUF4TpFOs5Eg50eFSOBfOz0GYCWoJwDoJzwcjQBfM2rMAjD0CEsL/Qp4ISG/FHkuJ4A9toXv66KomosMMNAuAA6GxOWPwqP64sb3kTm7HX1Fbsued9BXjACZKNIphLz/FF4WIps6vqff+jaIFAONiBbTf1hDITti5RLg+cYoDOxqJFwxb0dXmT5Bn/Pn8wOh9dQnMASK4aaSGuk+G24DObCbm5XzkXs9RdASTuytUZO6Czdm2BCA2cSgNbIWedxk0AV4FVYEYFJpLK4SuA3DrsceQEQl6svXy33CKfxIrwAanqZBA8R4AAQWeUMwJ6CZ7t7BIh6utfos0uLwxqP7BECMaTUuQCoawhO+9sSUWtjs1kA9I1Fm8DoNiCl64nUCsp9Ym1SgncjoLoz7YTl9dNOtbGRYSAjWbMDNPKw3py0otNeufVYN2wvzha5g6iGzlTDebsfEdbtW9EsLOvYZs06Dmbsq4GjcoeBgThBWtRN2zZ1mYUuGZ7axfz9hZEns+mMQ+ckzIYm/gn+WQvWWRq6uoxuSNi4RWWAYGfRuCtjXx25Bh25MGaTFzaccCVX1wfPtkiCk+e6nh/ExXps/N6z80PyL8wPTYgPwzDiAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDExLTAxLTE5VDAzOjU5OjAwKzAxOjAwaFry6QAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxMC0xMi0yMVQxNDozMDo0NCswMTowMGxOe/8AAAAZdEVYdFNvZnR3YXJlAEFkb2JlIEltYWdlUmVhZHlxyWU8AAAAAElFTkSuQmCC' },
		natural     : { 
			cidade: { type: String },
			estado: { type: String },
			pais  : { type: String }
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
		}],
		simbolico    : {
			cim      : { type: Number },
			iniciado : { type: Date },
			elevado  : { type: Date },
			exaltado : { type: Date },
			instalado: { type: Date },
			lojas      : [{
				loja   : { type: ObjectId, ref: 'Loja', default: null },
				membro : { 
					ativo  : { type: Boolean },
					desde  : { type: Date },
					ate    : { type: Date },
					tipo   : { type: String, enum: ['Emérito', 'Remido', 'Outro']},
					filiado: { type: Boolean }  // true: membro filiado; false: membro permanente
				},
				cargo      : { type: String }
			}]
		},
		filosofico  : {
			ime     : { type: Number },
			graus   : [{
				grau: { type: Number },
				data: { type: Date }
			}],
			lojas      : [{
				loja   : { type: ObjectId, ref: 'Loja', default: null },
				membro : { 
					ativo  : { type: Boolean },
					desde  : { type: Date },
					ate    : { type: Date },
					tipo   : { type: String, enum: ['Emérito', 'Remido', 'Outro']},
					filiado: { type: Boolean }  // true: membro filiado; false: membro permanente
				},
				cargo      : { type: String }
			}]
		},
		contato     : [{
			tipo    : { type: String },
			valor   : { type: String }
		}],
		documentos  : {
			cpf     : { type: String },
			rg      : {
				nro  : { type: String },
				dtemi: { type: Date },
				orgao: { type: String },
				ufemi: { type: String }
			},
			titulo  : {
				nro   : { type: String },
				zona  : { type: String },
				secao : { type: String },
				cidade: { type: String },
				estado: { type: String }
			},
			rne    : {
				tipo : { type: String },
				nro  : { type: String },
				valid: { type: Date }
			}
		},
		familia: {
			esposa: {
				nome     : { type: String },
				dnasc    : { type: Date },
				email    : { type: String },
				profissao: {
					profissao : { type: String },
					aposentada: { type: Boolean }
				},
				dataCasamento: { type: Date }
			},
			filhos: [{
				nome : { type: String },
				dnasc: { type: Date },
				sexo : { type: String }
			}]
		},
		informacoes: {
			profissao : { type: String },
			aposentado: { type: Boolean },
			empregos  : [{
				empregador: { type: String },
				telefone  : { type: String },
				endereco    : [{
					tipo       : { type: String },
					rua        : { type: String },
					numero     : { type: String },
					complemento: { type: String },
					bairro     : { type: String },
					cidade     : { type: String },
					estado     : { type: String },
					cep        : { type: String },
				}],
				cargo     : { type: String },
				renda     : { type: Number },
				atual     : { type: Boolean }
			}],
			outraAtiv : { type: Boolean },
			listaAtiv : [{
				atividade: { type: String },
				renda    : { type: Number }
			}],
			idiomas: [{
				idioma : { type: String },
				fala   : { type: Number }, // 0 - Não; 1: Pouco; 2: Regular; 3: Bom
				entende: { type: Number }, // 0 - Não; 1: Pouco; 2: Regular; 3: Bom
				leitura: { type: Number }, // 0 - Não; 1: Pouco; 2: Regular; 3: Bom
				escrita: { type: Number }  // 0 - Não; 1: Pouco; 2: Regular; 3: Bom
			}],
		},
		referencias: [{
			nome    : { type: String },
			macom   : { type: Boolean },
			CIM     : { type: Number },
			telefone: { type: String }
		}],
		relatedUser: { type: ObjectId, ref: 'Users', default: null },
		notes: { type: Array, default: [] },
		attachments: { type: Array, default: [] },
		history: { type: Array, default: [] },
		createdBy: {
			user: { type: ObjectId, ref: 'Users', default: null },
			date: { type: Date, default: Date.now }
		},
		editedBy: [{
			user: { type: ObjectId, ref: 'Users', default: null },
			date: { type: Date, default: Date.now }
		}]
	}
}, { collection: 'Irmao' });

irmaoSchema.virtual('eMacom').get(function() {
	return (this.perfil.simbolico.cim > 0);
});

irmaoSchema.virtual('simb.grau').get(function() {
	if (this.perfil.simbolico.exaltado)
		return 3;
	if (this.perfil.simbolico.elevado)
		return 2;
	if (this.perfil.simbolico.iniciado)
		return 1;
	return 0;
});

irmaoSchema.virtual('simb.instalado').get(function() {
	return (this.perfil.simbolico.instalado ? true : false);
});

irmaoSchema.virtual('filos.grau').get(function() {
	var grau = Math.max.apply(null, this.perfil.filosofico.graus.map(function(e) {
		return e.grau;
	}));
	return grau;
});

irmaoSchema.virtual('filos.ultElev').get(function() {
	var ultElev = Math.max.apply(null, this.perfil.filosofico.graus.map(function(e) {
		return e.data;
	}));
	return ultElev;
});

irmaoSchema.methods.isFromLodge = function(loja) {
	var retorno = false;
	if (this.perfil.simbolico.lojas.length != 0) {
		this.perfil.simbolico.lojas.length.forEach(function(item) {
			if (item.loja === loja)
				retorno = true;
		});
	} else {
		if (this.perfil.filosofico.lojas.length != 0) {
			this.perfil.filosofico.lojas.length.forEach(function(item) {
				if (item.loja === loja)
					retorno = true;
			});
		}
	}
	return retorno;
}

irmaoSchema.set('toJSON', { getters: true, virtuals: true });

// create the model for users and expose it to our app
var Irmao = mongoose.model('Irmao', irmaoSchema);

module.exports = Irmao;
