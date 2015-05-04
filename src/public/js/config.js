(function (hello) {
    angular.module('ngHello', [])
        .provider('helloProvider', function () {
            
			hello.init({
				facebook: '578142212328116',
				google: '263933745914-a43po947o090i0jduh0g1odl6057rcnp.apps.googleusercontent.com'
			}, {
				redirect_uri: '#/usuario/principal'
			});
		
			this.$get = function () {
                return hello;
            };
        });
})(hello)
;