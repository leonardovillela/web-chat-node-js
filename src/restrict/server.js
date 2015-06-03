var app = require('./config')();

var http = require('http').Server(app);
var io = require('socket.io')(http);

var chat = require('./services/chat');

chat.start(io);

var server = http.listen(app.get('port'), function() {
    console.log('Estou escutando na porta ' + app.get('port'));
});
