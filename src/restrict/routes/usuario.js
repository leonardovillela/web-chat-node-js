var usuarioController = app.controllers.usuario;

module.exports = function(app) {
	app.post('/cadastrar', usuarioController.cadastrar);
	app.post('/login', usuarioController.login);
}
