angular.module('trafegoMensagemController', [])

.controller('MensagemCtrl', ['$scope', 'ExtractData', '$rootScope', function ($scope, ExtractData, $rootScope) {
	var socket = io();

	socket.on('connect', function () {
		$rootScope.usuarioConectados.push(sessionStorage.getItem('nome'));
	});

	socket.on('chat message', function (msg) {
		$scope.mensagens.push(msg);

		$scope.$digest();
	});

	$rootScope.usuarioConectados = [];

	$scope.mensagens = [
		{
			conteudo: 'Testando 123',
			enviadoPor: 'leonardo',
			horario: '08:40:30'
		},
		{
			conteudo: 'Testando 1234',
			enviadoPor: 'yuri',
			horario: '09:40:30'
		}
	];

	$scope.enviarMensagem = function () {
		$scope.mensagem.enviadoPor = sessionStorage.getItem('nome');
		$scope.mensagem.horario = ExtractData.getHorario(new Date());

		socket.emit('chat message', $scope.mensagem);
		$scope.mensagem.conteudo = '';
	};
}])

;