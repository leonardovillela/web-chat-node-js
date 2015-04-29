angular.module('utils', [])

.factory('ExtractData', [function() {
	return {
		getHorario: function(data) {
			h = data.getHours();
			m = data.getMinutes();
			s = data.getSeconds();
			
			return h + ':' + m + ':' + s;
		}
	}
}])

;