angular.module('highlow').controller('AboutCtrl', ['$scope', '$modalInstance', function($scope, $modalInstance) {
	'use strict';
	
  	$scope.close = function() {
    	$modalInstance.dismiss('close');
  	};
}]);