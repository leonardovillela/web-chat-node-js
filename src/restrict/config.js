var load = require('express-load');

var path = require('path');
var bodyParser = require('body-parser');

var morgan = require('morgan');

module.exports = function(express) {
	var app = express();

	app.use(morgan('dev'));

	app.use(express.static(path.join(__dirname, '../../')));
	app.use(express.static(path.join(__dirname, '../public')));

	app.use(bodyParser.urlencoded({limit: '50mb'}));
	app.use(bodyParser.json({limit: '50mb'}));
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({
		extended: true
	}));

	app.set('port', 3000);

	load('models')
		.then('controllers')
		.then('routes')
		.into(app);

	return app;
};