var crypto = require('crypto');

exports.encrypt = function(text, key){
	var cipher = crypto.createCipher('aes-256-ctr', key);
	var crypted = cipher.update(text, 'utf8', 'hex');
	crypted += cipher.final('hex');
	return crypted;
}
 
exports.decrypt = function(text, key){
	var decipher = crypto.createDecipher('aes-256-ctr', key);
	var dec = decipher.update(text, 'hex', 'utf8');
	dec += decipher.final('utf8');
	return dec;
}
