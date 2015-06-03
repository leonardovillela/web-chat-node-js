var usuarioController = require('../controllers/usuario.js')();

module.exports = function(router) {
	router.post('/cadastrar', usuarioController.cadastrar);
	router.post('/login', usuarioController.login);
}
