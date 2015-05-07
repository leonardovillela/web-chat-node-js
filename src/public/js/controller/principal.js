angular.module('trafegoMensagemController', [])

.controller('MensagemCtrl', ['$scope', 'ExtractData', 'WebSocketProvider', function ($scope, ExtractData,
	WebSocketProvider) {

	var permission = new Promise(function (resolve, reject) {
		if (Notification.permission === 'default') {
			
			Notification.requestPermission(function (result) {
				if (result === 'granted') {
					resolve('Usuario concedeu permissão');
				} else {
					reject('Usuario não concedeu permissão')
				}
			});	
		} else if (Notification.permission === 'granted') {
			resolve('Permissão já está concedida');
		} else {
			reject('Permissão já está negada');
		}
	});

	var socket = WebSocketProvider;

	socket.emit('add usuario', {
		id: sessionStorage.getItem('id'),
		nome: sessionStorage.getItem('nome')
	});

	socket.on('chat message', function (msg) {
		$scope.mensagens.push(msg);
		
		if (document.visibilityState != 'visible') {
			permission.then(function () {
				var notificationBasica = new Notification('Nova mensagem', {
					body: msg.conteudo.slice(0, 30)
				});

				notificationBasica.show();
			}, function (err) {
				console.log(err);
			});	
		}

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