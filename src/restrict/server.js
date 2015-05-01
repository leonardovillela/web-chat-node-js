var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');
var chat = require('./services/chat');
var routes = require('./routes');

chat.start(io);

app.get('/id', routes.getId);

app.use(express.static(path.join(__dirname, '../../')));
app.use(express.static(path.join(__dirname, '../public')));

app.set('port', 3000);

var server = http.listen(app.get('port'), function() {
    console.log('Estou escutando na porta ' + app.get('port'));
});
