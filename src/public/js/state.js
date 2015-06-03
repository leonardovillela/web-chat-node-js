angular.module('WebChat')

.config(function($stateProvider, $urlRouterProvider) {
	
	$urlRouterProvider.otherwise('/home');
	
	$stateProvider
	
	.state('home', {
		url: '/home',
		templateUrl: '/src/public/partials/home.html',
	})
	
	.state('usuario', {
		url: '/usuario',
		template: '<div ui-view></div>',
		abstract: true,
	})
		.state('usuario.principal', {	
			url: '/principal',
			templateUrl: '/src/public/partials/usuario/principal.html',
			resolve: {
				socket: function(WebSocketProvider) {
					return WebSocketProvider;
				}
			},
			onExit: function(socket){
    			socket.emit('delelete user');
  			},
		})
	
		.state('usuario.cadastrar', {
			url: '/cadastrar',
			templateUrl: '/src/public/partials/usuario/cadastro.html',
		})

		.state('usuario.login', {
			url: '/login',
			templateUrl: '<h1>Você precisa se logar!</h1>'
		})
	
	;
});