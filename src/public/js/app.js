angular.module('WebChat', [
	'ngResource',

	'ui.router',
	'ui.bootstrap',
	
	'flow',

	'ngSanitize',
	'ngHello',

	'emoji',
	
	'services',

	'usuarioController',
	'trafegoMensagemController',
	'menuController'
])

.controller('MainCtrl', ['$rootScope', 'UsuarioService', '$state', function($rootScope,
	UsuarioService, $state) {
		$rootScope.$on('unauthorized', function() {
			UsuarioService.setUsuarioAtual(null);

			$state.go('usuario.login');
		});
	}
])

;