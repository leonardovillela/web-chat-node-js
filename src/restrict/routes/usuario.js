module.exports = function(app) {
	var usuarioController = require('../controllers/usuario.js')(app);

	app.get('router').post('/cadastrar', usuarioController.cadastrar);
	app.get('router').post('/login', usuarioController.login);
}
