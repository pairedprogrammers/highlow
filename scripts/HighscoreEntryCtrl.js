angular.module('highlow').controller('HighscoreEntryCtrl', ['$scope', '$state', '$stateParams', 'HighscoreFactory',
function($scope, $state, $stateParams, HighscoreFactory) {
    'use strict';
    
    $scope.score = $stateParams.score;
    $scope.thirdLast = $stateParams.thirdLast;
    $scope.secondLast = $stateParams.secondLast;
    $scope.lastNumber = $stateParams.lastNumber;
    $scope.highscoreName = HighscoreFactory.getPreviousName();
    
    $scope.addHighscore = function() {
    	HighscoreFactory.addHighscore($scope.score, $scope.highscoreName);
    	$state.go('gameover', {
    		score: $scope.score,
    		thirdLast: $scope.thirdLast,
    		secondLast: $scope.secondLast,
    		lastNumber: $scope.lastNumber,
    		highscoreAdded: true
    	});
    };
}]);