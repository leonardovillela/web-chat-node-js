angular.module('usuarioController', [])

.controller('UsuarioHome', ['$scope', '$state', function($scope, $state) {
	
	$scope.entrar = function() {
		if (sessionStorage.getItem('seqUsuario') == null || sessionStorage.getItem('seqUsuario') == undefined) {
			alert('Precisa se cadastrar');
			$state.go('usuario.cadastrar');
		} else {
			$state.go('usuario.principal');	
		}
	};
}])

.controller('UsuarioCadastro', ['$scope', 'GerarIdUsuario', function($scope, GerarIdUsuario) {
	$scope.usuario = {};
	
	$scope.cadastrarUsuario = function() {
		var sequencia =  GerarIdUsuario.sequenciaUsuario;
		
		$scope.usuario.seq = sequencia;
		
		sessionStorage.setItem('seqUsuario', sequencia);
		sessionStorage.setItem('nome', $scope.usuario.nome);	
	};
}])
;