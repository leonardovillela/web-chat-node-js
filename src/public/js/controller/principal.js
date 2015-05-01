angular.module('trafegoMensagemController', [])

.controller('MensagemCtrl', ['$scope', 'ExtractData', 'WebSocketProvider', function ($scope, ExtractData, 
		WebSocketProvider) {
		
	var socket = WebSocketProvider;
	
	socket.emit('add usuario', {
		id: sessionStorage.getItem('id'),
		nome: sessionStorage.getItem('nome')
	});

	socket.on('chat message', function (msg) {
		$scope.mensagens.push(msg);

		$scope.$digest();
	});

	$scope.mensagens = [];

	$scope.enviarMensagem = function () {
		if ($scope.mensagem.conteudo == '') return;
		$scope.mensagem.enviadoPor = sessionStorage.getItem('nome');
		$scope.mensagem.horario = ExtractData.getHorario(new Date());

		socket.emit('chat message', $scope.mensagem);
		$scope.mensagem.conteudo = '';
	};
}])

;