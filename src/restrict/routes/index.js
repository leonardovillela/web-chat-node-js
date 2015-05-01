var hash = require('../services/generate-token.js');

exports.getId = function(req, res) {
	var id = hash.getHashId();
	
	res.json({id: id});
};