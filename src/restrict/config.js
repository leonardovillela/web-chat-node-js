var express = require('express');
var router = express.Router();
var path = require('path');
var bodyParser = require('body-parser');

var morgan = require('morgan');

var jwt = require('jsonwebtoken');

//Routes
var usuarioRoute = require('./routes/usuario.js');

module.exports = function() {
	var app = express();

	app.set('port', 3000);
	app.set('superSecret', 'webChatNodejs');
	app.set('router', router);

	app.use(morgan('dev'));

	app.use('/rest', router);

	app.use(express.static(path.join(__dirname, '../../')));
	app.use(express.static(path.join(__dirname, '../public')));

	router.use(bodyParser.urlencoded({limit: '50mb'}));
	router.use(bodyParser.json({limit: '50mb'}));
	router.use(bodyParser.json());
	router.use(bodyParser.urlencoded({
		extended: true
	}));

	usuarioRoute(app);

	router.use(function(req, res, next) {
		var token = req.body.token || req.query.token 
			|| req.headers['x-access-token'];

		if (token) {
			jwt.verify(token, app.get('superSecret'), function(err, encoded) {
				if (err) {
					return res.status(401).send({
						mensagem: 'erro ao autenticar o token'
					});
				} else {
					req.decoded = decoded;

					next();
				}
			});
		} else {
			return res.status(401).send({
				mensagem: 'Nao tem token criado'
			});
		}
	});

	return app;
};