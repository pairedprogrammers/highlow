angular.module('highlow').controller('HighscoreCtrl', ['$scope', '$modalInstance', 'HighscoreFactory', function($scope, $modalInstance, HighscoreFactory) {
	'use strict';

    HighscoreFactory.getHighscores().then(function(scores) {
       $scope.scores = scores.local; 
    });

  	$scope.scores = HighscoreFactory.getHighscores();
  	$scope.showReset = false;

  	$scope.close = function() {
    	$modalInstance.dismiss('close');
  	};
  	
  	$scope.reset = function() {
  		$scope.showReset = true;
  	};
  	
  	$scope.confirmReset = function() {
  		$scope.showReset = false;
  		HighscoreFactory.reset();
  		$scope.scores = HighscoreFactory.getHighscores();
  	};
  	
  	$scope.declineReset = function() {
  		$scope.showReset = false;
  	};
}]);