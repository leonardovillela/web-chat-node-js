var arrayUtils = require('mout/array');
var usuariosConectados = [];

var deleteUser = function(socket) {
	var index = usuariosConectados.indexOf(socket);
	usuariosConectados.splice(index, 1);
};

var buscarUsuarioPorNome = function(nome) {
	var usuariosEncontrados = usuariosConectados.filter(function(elemento) {
		return elemento.usuario.nome === nome;
	});
	
	return usuariosEncontrados;
};

var limparComandoPrivadoDoConteudo = function(msg) {
	var finalComando = msg.conteudo.indexOf(']');
	
	msg.conteudo = msg.conteudo.substring(finalComando + 1);
};

var emitirMensagemParaCadaUsuario = function(usuarios, msg) {
	limparComandoPrivadoDoConteudo(msg);
	
	arrayUtils.forEach(usuarios, function(usuario) {
		usuario.socketIO.emit('privateMessage', msg);
	});
};

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
			deleteUser(socket);
		});
		
		socket.on('delelete user', function() {
			deleteUser(socket);
		});

		socket.on('chat message', function(msg){
			io.emit('chat message', msg);
		});
		
		socket.on('privateMessage', function(msg) {
			var nome = msg.destino;
			var usuarios = buscarUsuarioPorNome(nome);
			
			emitirMensagemParaCadaUsuario(usuarios, msg);
		});	
	});
};