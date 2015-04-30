var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');

var usuariosConectados = [];

io.emit('chat message', { for: 'everyone' });

io.on('connection', function(socket) {	
	socket.on('add usuario', function(usuario) {
		usuariosConectados.push(usuario);
		console.log(usuariosConectados);
	});
	
	socket.on('user connecteds', function() {
		io.emit('usuarios conectados', usuariosConectados);
	});
	
	socket.on('disconnect', function() {
		io.emit('chat message', 'o usuario');
	});
	
	socket.on('chat message', function(msg){
    	console.log('message: ' + msg.conteudo);
		io.emit('chat message', msg);
  	});
});


app.use(express.static(path.join(__dirname, '../../')));
app.use(express.static(path.join(__dirname, '../public')));

app.set('port', OPENSHIFT_NODEJS_PORT || 3000);

var server = http.listen(app.get('port'), function() {
    console.log('Estou escutando na porta ' + app.get('port'));
});
