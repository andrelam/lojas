var User    = require('../models/user');
var Loja    = require('../models/loja');
var Irmao   = require('../models/irmao');
var irmaos  = require('../helper/irmao');

exports.getIrmaos = function(req, res) {
	if (irmaos.UserIsAdmin(req.user.email)) {
		Irmao.find({}).populate('perfil.simbolico.lojas.loja perfil.filosofico.lojas.loja perfil.relatedUser').exec(function(error, irmaos) {
			if (error) {
				res.status(400).json({ success: false, message: 'Cannot find brothers', data: error });
			} else {
				res.status(200).json({ success: true, message: 'Brothers found', data: irmaos });
			}
		});
	} else {
		res.status(400).json({ success: false, message: 'Cannot find Brothers1' });
	}
};


exports.getIrmaosPorLoja = function(req, res) {
	if (irmaos.UserIsFromLodge(req.user.email, req.params.loja_id)) {
		Irmao.find({ 'perfil.simbolico.lojas.loja': req.params.loja_id }).populate('perfil.simbolico.lojas.loja perfil.filosofico.lojas.loja perfil.relatedUser').exec(function(erroSimb, irmaos) {
			if (erroSimb) {
				Irmao.find({ 'perfil.filosofico.lojas.loja': req.params.loja_id }).populate('perfil.simbolico.lojas.loja perfil.filosofico.lojas.loja perfil.relatedUser').exec(function(erroFilo, irmaosFilo) {
					if (erroFilo) {
						res.status(400).json({ success: false, message: 'Cannot find brothers', data: erroFilo });
					} else {
						res.status(200).json({ success: true, message: 'Brothers found', data: irmaosFilo });
					}
				});
			} else {
				res.status(200).json({ success: true, message: 'Brothers found', data: irmaos });
			}
		});
	} else {
		res.status(400).json({ success: false, message: 'Cannot find brothers' });
	}
};



exports.postIrmao = function(req, res) {
	if (req.user.role.admin) {
		User.findOne({ email: req.user.email.toLowerCase() }, function(error, userAdm) {
			if (error) {
				res.status(400).json({ success: false, message: 'Cannot find users', data: error });
			} else {
				if (userAdm.role.admin) {

				} else {
					res.status(400).json({ success: false, message: 'User data not found' });
				}
			}
		});
	} else {
		res.status(401).json({ success: false, message: 'Cannot create lodge' });
	}
/*					if (req.body.titulo && req.body.nome && req.body.numero && req.body.tipo && req.body.admin) {
						Loja.findOne({ nome: req.body.nome }, function(err, loja) {
							if (loja) {
								res.status(401).json({ success: false, message: 'Lodge already exist' });
							} else {
								User.findOne({ email: req.body.admin.toLowerCase() }, function(err, admin) {
									if (err) {
										res.status(400).json({ success: false, message: 'Could not find admin', data: err });
									} else {
										var _loja      = new Loja();
										_loja.titulo   = req.body.titulo;
										_loja.nome     = req.body.nome;
										_loja.numero   = req.body.numero;
										_loja.tipo     = req.body.tipo;
										_loja.admin    = admin._id;
										_loja.save(function(err) {
											if (err) {
												res.status(400).json({ success: false, message: 'Could not save lodge', data: err });
											} else {
												res.status(200).json({ success: true, message: 'Lodge saved', data: _loja });
											}
										});
									}
								});
							}
						});
					} else {
						res.status(400).json({ success: false, message: 'Lodge data not found' });
					}
				} else {
					res.status(400).json({ success: false, message: 'User data not found' });
				}
			}
		});
	} else {
		res.status(401).json({ success: false, message: 'Cannot create lodge' });
	}
*/
};

exports.getIrmao = function(req, res) {
/*
	Loja.findById(req.params.loja_id).populate('admin membros.irmao').exec(function(err, loja) {
		if (err) {
			res.status(400).json({ success: false, message: 'Cannot find lodge', data: err });
		} else {
			res.status(200).json({ success: true, message: 'Lodge found', data: loja });
		}
	});
*/
};

exports.putIrmao = function(req, res) {
/*
	Loja.findById(req.params.loja_id).populate('admin membros.irmao').exec(function(err, loja) {
		if (err) {
			res.status(400).json({ success: false, message: 'Cannot find Lodge' });
		} else {
			if (loja.admin.email.toLowerCase() === req.user.email.toLowerCase()) {
				if (req.body.obediencia) 
					loja.obediencia = req.body.obediencia;
				if (req.body.cnpj)
					loja.dados.cnpj = req.body.cnpj;
				if (req.body.dataFundacao)
					loja.dados.dataFundacao = new Date(req.body.dataFundacao);
				if (req.body.ativa === 'Não') {
					loja.ativa = false;
				} else {
					loja.ativa = true;
				}
				loja.save(function(err) {
					if (err) {
						res.status(400).json({ success: false, message: 'Cannot update Lodge', data: err });
					} else {
						res.status(200).json({ success: true, message: 'Lodge saved', data: loja });
					}
				});
			} else {
				res.status(401).json({ success: false, message: 'Cannot update Lodge' });
			}
		}
	});
*/
};

exports.deleteIrmao = function(req, res) {
/*
	if (req.user.role.admin) {
		if (req.user._id === req.params.user_id) {
			res.status(400).json({ success: false, message: 'Cannot deactivate current user' });
		} else {
			User.findOne({ email: req.user.email.toLowerCase() }, function(error, userAdm) {
				if (error) {
					res.status(400).json({ success: false, message: 'Cannot find users', data: error });
				} else {
					if (userAdm.role.admin) {
						User.findById(req.params.user_id, function(err, user) {
							if (err) {
								res.status(400).json({ success: false, message: 'Cannot find user' });
							} else {
								user.roles.active    = false;
								user.save(function(err) {
									if (err) {
										res.status(400).json({ success: false, message: 'Cannot update user' });
									} else {
										res.status(200).json({ success: true, message: 'User found and deactivated', data: user });
									}
								});
							}
						});
					} else {
						res.status(400).json({ success: false, message: 'Cannot update user' });
					}
				}
			});
		}
	} else {
		res.status(401).json({ success: false, message: 'Cannot get list of users' });
	}
*/
};
