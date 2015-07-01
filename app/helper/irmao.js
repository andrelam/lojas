var Irmao = require('../models/irmao');
var User  = require('../models/user');



exports.UserIsAdmin = function(mail) {

	User.findOne({ email: mail.toLowerCase() }, function(err, user) {

		if (err)
			return false;

		if (!user)
			return false;

		if (user.role.admin)
			return true;
		
	});
	
	return false;
}


exports.UserIsFromLodge = function(mail, lodge) {

	if (this.UserIsAdmin(mail))
		return true;
	
	User.findOne({ email: mail.toLowerCase() }, function(err, user) {

		if (err)
			return false;

		if (!user)
			return false;

		Irmao.findOne({ 'perfil.relatedUser': user._id }, function(error, irmao) {
			if (error)
				return false;
			if (!irmao)
				return false;

			return (irmao.isFromLodge(lodge));
		});
		
	});

	return false;

}

