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

.controller('UsuarioCadastro', ['$scope', 'GerarIdUsuario', '$state', 'WebSocketProvider', function($scope, GerarIdUsuario,
		 $state, WebSocketProvider) {
	$scope.usuario = {};
	
	$scope.cadastrarUsuario = function() {
		var socket = WebSocketProvider;
		
		var id =  GerarIdUsuario.sequenciaUsuario;
		$scope.usuario.id = id;
		
		sessionStorage.setItem('id', id);
		sessionStorage.setItem('nome', $scope.usuario.nome);
		
		socket.emit('add usuario', {
			id: $scope.usuario.id,
			nome: $scope.usuario.nome
		});
		
		$state.go('usuario.principal');
	};
}])

;