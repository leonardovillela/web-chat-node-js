angular.module('WebChat')

.config(function($stateProvider, $urlRouterProvider) {
	
	$urlRouterProvider.otherwise('/home');
	
	$stateProvider
	
	.state('home', {
		url: '/home',
		templateUrl: '/src/public/partials/home.html',
		controller: function($scope) {
			$scope.dogs = ['Husk', 'Sao Bernado', 'Root'];
		},
	})
	
	.state('usuario', {
		url: '/usuario',
		template: '<div ui-view></div>',
		abstract: true,
	})
		.state('usuario.principal', {	
			url: '/principal',
			templateUrl: '/src/public/partials/usuario/principal.html',
		})
	
		.state('usuario.cadastrar', {
			url: '/cadastrar',
			templateUrl: '/src/public/partials/usuario/cadastro.html',
		})
	
	;
});