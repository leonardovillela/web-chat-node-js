var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

http.listen(3000, function() {
  console.log('Escutando na porta 3000');
});

app.get('/hello', function(req, res) {
  res.send('<h1>Hello world</h1>');
});

app.get('/chat', function(req, res) {
	res.sendFile(__dirname + '/public/index.html');
})

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
