angular.module('usuarioController', [])

.controller('UsuarioHome', ['$scope', '$state', '$rootScope', '$modal', function($scope, $state, $rootScope) {
	
	
	$scope.entrar = function() {
		if (sessionStorage.getItem('nome') == null || sessionStorage.getItem('nome') == undefined) {
			$state.go('usuario.cadastrar');
		} else {
			$rootScope.usuario = {nome: sessionStorage.getItem('nome'), id: sessionStorage.getItem('id')};
			$state.go('usuario.principal');	
		}
	};
}])

.controller('UsuarioCadastro', ['$scope', 'GerarIdUsuario', '$rootScope', '$state', function($scope, GerarIdUsuario, $rootScope, $state) {
	$scope.usuario = {};
	
	$scope.cadastrarUsuario = function() {
		var id =  GerarIdUsuario.sequenciaUsuario;
		$scope.usuario.id = id;
		
		$rootScope.usuario = {nome: $scope.usuario.nome, id: id};
		
		sessionStorage.setItem('id', id);
		sessionStorage.setItem('nome', $scope.usuario.nome);
		
		$state.go('usuario.principal');
	};
}])

;