var crypto = require('crypto');

exports.getHashId = function() {
	return crypto.randomBytes(20).toString('hex');
};
	
