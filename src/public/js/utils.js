angular.module('WebChat')

.factory('utils', [function() {
	return {
		regexEmail: '[A-Za-z0-9\\._-]+@[A-Za-z]+\\.[A-Za-z]+'
	};
}])

;