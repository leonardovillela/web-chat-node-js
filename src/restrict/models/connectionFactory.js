var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/webchat');

module.exports = mongoose;