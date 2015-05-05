var arrayUtils = require('mout/array');
var usuariosConectados = [];

exports.start = function(io) {
	
	io.emit('chat message', { for: 'everyone' });
	
	io.on('connection', function(socket) {	
		
		socket.on('add usuario', function(usuario) {
			usuariosConectados.push({usuario: usuario, socketIO: socket});
		});
		
		socket.on('get usersConnected', function() {
			var usuarios = [];
			
			usuariosConectados.forEach(function(elemento) {
				usuarios.push(elemento.usuario);	
			});
			
			socket.emit('send usersConnected', usuarios);
		});

		socket.on('disconnect', function() {
			var index = usuariosConectados.indexOf(socket);
			usuariosConectados.splice(index, 1);
		});

		socket.on('chat message', function(msg){
			console.log('message: ' + msg.conteudo);
			io.emit('chat message', msg);
		});
	});
};