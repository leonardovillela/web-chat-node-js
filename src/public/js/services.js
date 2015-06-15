angular.module('services', [])

.service('UsuarioService', ['localStorageService', function(localStorageService) {
	var usuarioAtual = null;

	this.setUsuarioAtual = function(usuario) {
		usuarioAtual = usuario;

		localStorageService.set('usuario', usuario);
		return usuarioAtual;
	};

	this.getUsuarioAtual = function() {
		if (!usuarioAtual) {
			usuarioAtual = localStorageService.get('usuario');
		}

		return usuarioAtual;
	};
}])

.service('APIInterceptor', ['$rootScope', 'UsuarioService', function($rootScope,
	UsuarioService) {

	var service = this;

	service.request = function(config) {
		var usuarioAtual = UsuarioService.getUsuarioAtual();
		var token = usuarioAtual ? usuarioAtual.token : null;

		if (token) {
			config.headers.authorization = token;
		}

		return config;
	};

	service.responseError = function(response) {
		if (response.status === 401) {
			$rootScope.$broadcast('unathorized');
		}

		return response;
	};
}])

.config(function($httpProvider) {
	$httpProvider.interceptors.push('APIInterceptor');
})

.service('LoginService', ['$rootScope', 'UsuarioResource', 'UsuarioService',
	function($rootScope, UsuarioResource, UsuarioService) {
		var service = this;

		service.login = function(usuario) {
			UsuarioResource.login(usuario)
				.then(function(response) {
					usuario.token = response.token;
					UsuarioService.setUsuarioAtual(usuario);

					$rootScope.broadcast('authorized');
					$state.go('usuario.principal');
				});		
		};
		
	}
])

	
.factory('UsuarioResource', ['$resource', function($resource) {
	return $resource('rest/cadastrar', null, {
		save: {
			method: 'POST'
		},

		login: {
			method: 'POST',
			url: 'rest/login'
		}
	});
}])

.factory('WebSocketProvider', [function() {
	return io();
}])

;
