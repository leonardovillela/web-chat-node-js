angular.module('trafegoMensagemController', [])

.controller('MensagemCtrl', ['$scope', 'ExtractData', 'WebSocketProvider', function ($scope, ExtractData, 
		WebSocketProvider) {
		
	var socket = WebSocketProvider;

	socket.on('chat message', function (msg) {
		$scope.mensagens.push(msg);

		$scope.$digest();
	});

	$scope.mensagens = [];

	$scope.enviarMensagem = function () {
		$scope.mensagem.enviadoPor = sessionStorage.getItem('nome');
		$scope.mensagem.horario = ExtractData.getHorario(new Date());

		socket.emit('chat message', $scope.mensagem);
		$scope.mensagem.conteudo = '';
	};
}])

;