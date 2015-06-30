// load the things we need
var bcrypt   = require('bcrypt-nodejs');
var mongoose = require('mongoose');

// define the schema for our user model
var userSchema = mongoose.Schema({
	email           : { type: String, required: true, unique: true, match: [ /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address' ] },
	password        : { type: String, required: true },
	lastAccess      : { type: Date },
	role            : {
		admin       : { type: Boolean },
		initiated   : { type: Boolean, default: false },
		active      : { type: Boolean, default: false }
	}
}, { collection: 'Users' });

// generating a hash
userSchema.methods.generateHash = function(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
	return bcrypt.compareSync(password, this.password);
};

userSchema.methods.verifyPassword = function(password, cb) {
	bcrypt.compare(password, this.password, function(err, isMatch) {
		if (err) return cb(err);
		cb(null, isMatch);
	});
};

// create the model for users and expose it to our app
var User = mongoose.model('Users', userSchema);

module.exports = User;
