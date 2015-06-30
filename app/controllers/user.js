var User    = require('../models/user.js');

exports.getUsers = function(req, res) {
	if (req.user.role.admin) {
		User.findOne({ email: req.user.email.toLowerCase() }, function(err, user) {
			if (err) {
				res.status(400).json({ success: false, message: 'Cannot find users', data: err });
			} else {
				if (user.role.admin) {
					User.find({}, function(error, users) {
						if (error) {
							res.status(400).json({ success: false, message: 'Cannot find users', data: error });
						} else {
							res.status(200).json({ success: true, message: 'Users found', data: users });
						}
					});
				} else {
					res.status(400).json({ success: false, message: 'Cannot find users' });
				}
			}
		});
	} else {
		res.status(401).json({ success: false, message: 'Cannot get list of users' });
	}
};


exports.postUser = function(req, res) {
	if (req.user.role.admin) {
		User.findOne({ email: req.user.email.toLowerCase() }, function(error, userAdm) {
			if (error) {
				res.status(400).json({ success: false, message: 'Cannot find users', data: error });
			} else {
				if (userAdm.role.admin) {
					if (req.body.email && req.body.password) {
						User.findOne({ email: req.body.email.toLowerCase() }, function(err, user) {
							if (user) {
								res.status(401).json({ success: false, message: 'User already exist' });
							} else {
								var _user      = new User();
								_user.email    = req.body.email;
								_user.password = _user.generateHash(req.body.password);
								_user.save(function(err) {
									if (err) {
										res.status(400).json({ success: false, message: 'Could not save user' });
									} else {
										res.status(200).json({ success: true, message: 'User saved' });
									}
								});
							}
						});
					} else {
						res.status(400).json({ success: false, message: 'User data not found' });
					}
				} else {
					res.status(400).json({ success: false, message: 'User data not found' });
				}
			}
		});
	} else {
		res.status(401).json({ success: false, message: 'Cannot create user' });
	}
};

exports.getUser = function(req, res) {
	if (req.user.role.admin) {
		User.findOne({ email: req.user.email.toLowerCase() }, function(error, userAdm) {
			if (error) {
				res.status(400).json({ success: false, message: 'Cannot find users', data: error });
			} else {
				if (userAdm.role.admin) {
					User.findById(req.params.user_id, function(err, user) {
						if (err) {
							res.status(400).json({ success: false, message: 'Cannot find user' });
						} else {
							res.status(200).json({ success: true, message: 'User found', data: user });
						}
					});
				} else {
					res.status(400).json({ success: false, message: 'Cannot find user' });
				}
			}
		});
	} else {
		res.status(401).json({ success: false, message: 'Cannot get list of users' });
	}
};

exports.putUser = function(req, res) {
	if (req.user.role.admin) {
		User.findOne({ email: req.user.email.toLowerCase() }, function(error, userAdm) {
			if (error) {
				res.status(400).json({ success: false, message: 'Cannot find users', data: error });
			} else {
				if (userAdm.role.admin) {
					User.findById(req.params.user_id, function(err, user) {
						if (err) {
							res.status(400).json({ success: false, message: 'Cannot find user' });
						} else {
							user.roles.initiated = req.body.iniciado;
							user.roles.active    = true;
							user.save(function(err) {
								if (err) {
									res.status(400).json({ success: false, message: 'Cannot update user' });
								} else {
									res.status(200).json({ success: true, message: 'User found', data: user });
								}
							});
						}
					});
				} else {
					res.status(401).json({ success: false, message: 'Cannot get list of users' });
				}
			}
		});
	} else {
		res.status(401).json({ success: false, message: 'Cannot get list of users' });
	}
};

exports.deleteUser = function(req, res) {
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
};
