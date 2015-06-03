var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/webchat');

process.on('SIGINT', function() {
	mongoose.connection.close(function() {
		process.exit(0);
	});
})

module.exports = mongoose;