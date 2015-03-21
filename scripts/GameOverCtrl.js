angular.module('highlow').controller('GameOverCtrl', ['$scope', '$state', '$stateParams', 'hotkeys',
function($scope, $state, $stateParams, hotkeys) {
    'use strict';
    
    $scope.score = $stateParams.score;
    $scope.thirdLast = $stateParams.thirdLast;
    $scope.secondLast = $stateParams.secondLast;
    $scope.lastNumber = $stateParams.lastNumber;
    $scope.highscoreAdded = $stateParams.highscoreAdded;
    
    $scope.newGame = function() {
    	$state.go('game');
    };
    
	hotkeys.bindTo($scope).add({
		combo: 'n',
		description: 'New game',
		callback: function() {
			$scope.newGame();
		}
	});
}]);