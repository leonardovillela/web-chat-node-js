angular.module('usuarioController', [])

.controller('UsuarioHome', ['$scope', '$state', '$rootScope', '$modal',
	function($scope, $state, $rootScope) {
	
		$scope.entrar = function() {
			if (sessionStorage.getItem('nome') == null || sessionStorage.getItem('nome') == undefined) {
				$state.go('usuario.cadastrar');
			} else {	
				$rootScope.usuario = {
					nome: sessionStorage.getItem('nome'), 
					id: sessionStorage.getItem('id')
				};

				$state.go('usuario.principal');		
			}
		};
	}
])

.controller('UsuarioCadastro', ['$scope', '$state', 'helloProvider', 'utils',
	'UsuarioResource', 'LoginService', function($scope, $state, helloProvider, 
	utils, UsuarioResource, LoginService) {

		$scope.usuario = {};
		
		$scope.usuario.imagem = '../../images/usuario-sem-imagem.png';

		$scope.validacaoUsuarioEmail = utils.regexEmail;
				
		$scope.cadastrarUsuario = function() {
			$scope.usuario.imagem = (angular.element('#usuario-img')[0]).src;
			
			UsuarioResource.save($scope.usuario, function(resp) {
				LoginService.login({
					usuario: $scope.usuario.nome,
					senha: $scope.usuario.senha
				});
			});
		};
		
		$scope.cadastrarSocial = function(redeSocial) {
			helloProvider(redeSocial).login();
		};
		
		helloProvider.on('auth.login', function(auth) {
			helloProvider(auth.network).api('/me').then(function(responseDataUser) {
				
				$scope.usuario.nome = responseDataUser.first_name + ' ' + responseDataUser.last_name;
				
				//$scope.cadastrarUsuario();
			});
		});
	}
])

.controller('UsuarioLogin', ['$scope', 'LoginService', function($scope, 
	LoginService) {

		$scope.login = LoginService.login($scope.usuario);
	}
]);

;
