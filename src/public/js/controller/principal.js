angular.module('trafegoMensagemController', [])

.controller('MensagemCtrl', ['$scope', 'WebSocketProvider', function ($scope, WebSocketProvider) {
	
	var socket = WebSocketProvider;
	
	var temMensagemConteudo = function() {
		return $scope.mensagem.conteudo === '' ? false : true;
	};
	
	var montarMensagem = function() {
		$scope.mensagem.enviadoPor = sessionStorage.getItem('nome');
		$scope.mensagem.horario = new Date();	
	};
	
	var enviarDesktopNotification = function(msg) {
		if (document.visibilityState != 'visible') {
			permission.then(function () {
				var notificationBasica = new Notification('Nova mensagem', {
					body: msg.conteudo.slice(0, 30),
					icon: '../../images/1431070148_message-01.png'
				});

				setTimeout(function () {
					notificationBasica.close();
				}, 3000);
				
			}, function (err) {
				console.log(err);
			});
		}
	};

	var verificarSeMensagemPrivada = function() {
		var verificacao = $scope.mensagem.conteudo.search('/pm');
		
		return verificacao !== -1 ? true : false;
	};
	
	var scrollChat = function() {
		//TODO encapsular isso em uma diretiva, talvez usar o polymer para testar.
		document.getElementsByClassName('list-group')[0].scrollTop += Number.MAX_VALUE;
	};
	
	var getDestinoPrivateMessage = function() {
		var inicio = $scope.mensagem.conteudo.indexOf('[');
		var fim = $scope.mensagem.conteudo.indexOf(']');
		
		return $scope.mensagem.conteudo.substring(inicio + 1, fim);
	};
	
	$scope.mensagens = [];
	
	socket.emit('add usuario', {
		id: sessionStorage.getItem('id'),
		nome: sessionStorage.getItem('nome')
	});

	socket.on('chat message', function (msg) {
		$scope.mensagens.push(msg);
		
		enviarDesktopNotification(msg);
		
		$scope.$digest();
		scrollChat();
	});
	
	socket.on('privateMessage', function(msg) {
		$scope.mensagens.push(msg);
		
		enviarDesktopNotification(msg);
		
		$scope.$digest();
		scrollChat();
	});

	$scope.enviarMensagem = function() {
		if (!temMensagemConteudo()) return;
		
		montarMensagem();
		
		if(verificarSeMensagemPrivada()) {
			$scope.mensagem.destino = getDestinoPrivateMessage();
			socket.emit('privateMessage', $scope.mensagem);	
		} else {
			socket.emit('chat message', $scope.mensagem);	
		}
		
		$scope.mensagem.conteudo = '';
	};

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
}])

;