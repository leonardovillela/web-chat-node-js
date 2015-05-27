var usuarioModel = app.models.usuarioModel;

module.exports = function() {
	var controller = {};

	controller.cadastrar = function(req, res) {
		var usuarioReq = req.body;

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
		var usuario = req.body.usuario;
		var senha = req.body.senha;

	  	User.findOne({
	    	usuario: usuario
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