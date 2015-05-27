angular.module('services', [])

.factory('UsuarioResource', ['$resource', function($resource) {
	return $resource('rest/cadastrar', null, {
		save: {
			method: 'POST'
		}
	});
}])

.factory('WebSocketProvider', [function() {
	return io();
}])

;
