exports.start = function(io) {
	var usuariosConectados = [];
	
	io.emit('chat message', { for: 'everyone' });
	
	io.on('connection', function(socket) {	
		
		socket.on('add usuario', function(usuario) {
			usuariosConectados.push({usuario: usuario, socketIO: socket});   //A merda é no socket mesmo rever essa porra
			console.log(usuariosConectados);
		});

		socket.on('get usersConnected', function() {
			console.log('entrei aaaa');
			io.emit('send usersConnected', usuariosConectados);
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