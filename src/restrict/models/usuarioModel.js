var mongoose = require('./connectionFactory.js');
var bcrypt = require('bcrypt-nodejs');

var usuarioSchema = new mongoose.Schema({
	usuario: {type: String, required: true, unique: true},
	senha: {type: String, required: true},
	email: {type: String, required: true},
	imagem: {type: String}
});

usuarioSchema.pre('save', function(next) {
  var user = this;
  if (!user.isModified('password')) return next();
  bcrypt.genSalt(5, function(err, salt) {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

usuarioSchema.methods.verificaSenha = function(password, next) {
  bcrypt.compare(password, this.password, function(err, isMatch) {
    if (err) return next(err);
    next(isMatch);
  });
};

var usuario = mongoose.model('usuario', usuarioSchema);

module.exports = usuario;