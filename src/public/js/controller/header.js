angular.module('menuController', [])

.controller('headerCtrl', ['$scope', 'WebSocketProvider', '$rootScope', '$state', function ($scope, WebSocketProvider, $rootScope, $state) {

	$scope.mostrarUsuariosConectados = function () {
		WebSocketProvider.emit('get usersConnected');
	};

	WebSocketProvider.on('send usersConnected', function (usuarios) {
		$rootScope.usuariosConectados = usuarios;

		$rootScope.open();
	});
}])

.controller('ModalDemoCtrl', function ($scope, $modal, $log, $rootScope) {
	$rootScope.open = function () {
		var modalInstance = $modal.open({
			templateUrl: 'myModalContent.html',
			controller: 'ModalInstanceCtrl',
			resolve: {
				usuariosConectados: function () {
					return $rootScope.usuariosConectados;
				}
			}
		});
	};
})

.controller('ModalInstanceCtrl', function ($scope, $modalInstance, usuariosConectados) {

	$scope.usuariosConectados = usuariosConectados;

	$scope.cancel = function () {
		$modalInstance.dismiss('cancel');
	};
})

;