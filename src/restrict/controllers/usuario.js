var usuarioModel = require('../models/usuarioModel.js');
var jwt = require('jsonwebtoken');

module.exports = function(app) {	
	var controller = {};

	controller.cadastrar = function(req, res) {
		var usuarioReq = req.body;
		console.log(req.body);

		var usuario = new usuarioModel({
			usuario: usuarioReq.nome,
 			senha: usuarioReq.senha,
 			email: usuarioReq.email,
 			imagem: usuarioReq.imagem
		});

		usuario.save(function(err) {
			if (err) res.send(err);

			res.json({usuarioCriado: true});
		});
	};

	controller.login = function(req, res) {
		var usuarioReq = req.body.usuario;
		var senha = req.body.senha;

	   	usuarioModel.findOne({
	     	usuario: usuarioReq
	   	}, function(err, user) {

	 	    if (err) throw err;

	 		user.verificaSenha(senha, function(isMatch) {
	 			if (!isMatch) return res.send(401);
	 		});
	        
	        var token = jwt.sign(user, app.get('superSecret'), {
	           expiresInMinutes: 1440 
	        });

 	       res.json({
	           success: true,
	           token: token
	        });   
	    });
	};

	return controller;
}