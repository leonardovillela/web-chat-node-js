var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');
var chat = require('./services/chat');
//var routes = require('routes');
var bodyParser = require('body-parser');

//app.get('/id', routes.getId);

app.use(express.static(path.join(__dirname, '../../')));
app.use(express.static(path.join(__dirname, '../public')));

app.use(bodyParser.urlencoded({limit: '50mb'}));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

app.set('port', 3000);

chat.start(io);

var server = http.listen(app.get('port'), function() {
    console.log('Estou escutando na porta ' + app.get('port'));
});
