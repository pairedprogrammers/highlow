angular.module('highlow').directive('initialFocus', ['$timeout', function($timeout) {
	'use strict';
	
	return {
		scope: {
		},
		link: function(scope, element, attrs) {
			element[0].focus();
		}
	};
}]);
