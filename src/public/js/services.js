angular.module('services', [])

.factory('GerarIdUsuario', ['$resource', function($resource) {
	return $resource('/id');
}])

.factory('WebSocketProvider', [function() {
	return io();
}])
;