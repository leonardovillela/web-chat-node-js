angular.module('services', [])

.factory('GerarIdUsuario', [function() {
	var seq = -1;
	
	return {
		sequenciaUsuario: ++seq
	};
}]);