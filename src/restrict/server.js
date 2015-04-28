var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');

io.on('connection', function(socket) {
	console.log('Um usuário se conectou ao server');
	
	socket.on('disconnect', function() {
		console.log('Usuário se desconectou.');
	});
	
	socket.on('chat message', function(msg){
    	console.log('message: ' + msg);
		io.emit('chat message', msg);
  	});
});


app.use(express.static(path.join(__dirname, '../../')));
app.use(express.static(path.join(__dirname, '../public')));

app.set('port', 3000 || process.env.PORT);

var server = app.listen(app.get('port'), function() {
    console.log('Estou escutando na porta ' + app.get('port'));
});
