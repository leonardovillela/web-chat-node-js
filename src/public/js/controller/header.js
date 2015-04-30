angular.module('WebChat')

.controller('headerCtrl', ['$scope', 'WebSocketProvider', '$rootScope', function($scope, WebSocketProvider, $rootScope) {
	$scope.mostrarUsuariosConectados = function() {
		WebSocketProvider.emit('user connecteds');
		
		WebSocketProvider.on('usuarios conectados', function(usuarios) {
			$rootScope.usuariosConectados = usuarios;
            $rootScope.open();
		});
	};
}])

.controller('ModalInstanceCtrl', function ($scope, $modalInstance, usuariosConectados) {

    $scope.usuariosConectados = usuariosConectados;
    
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
})

.controller('ModalDemoCtrl', function ($scope, $modal, $log, $rootScope) {    
    
    $rootScope.open = function (size) {
        var modalInstance = $modal.open({
          templateUrl: 'myModalContent.html',
          controller: 'ModalInstanceCtrl',
          size: size,
          resolve: {
            usuariosConectados: function () {
              return $rootScope.usuariosConectados;
            }
          }
        });
    };
})

;