angular.module('highlow').controller('HighscoreEntryCtrl', ['$scope', '$state', '$stateParams', 'HighscoreFactory',
function($scope, $state, $stateParams, HighscoreFactory) {
    'use strict';
    
    $scope.score = $stateParams.score;
    $scope.thirdLast = $stateParams.thirdLast;
    $scope.secondLast = $stateParams.secondLast;
    $scope.lastNumber = $stateParams.lastNumber;
    $scope.highscoreName = HighscoreFactory.getPreviousName();
    $scope.maxNameLength = HighscoreFactory.getMaxNameLength();
    
    switch($stateParams.highscoreType) {
        case HighscoreFactory.getHighscoreTypes().Local:
            $scope.type = 'local';
            break;
        
        case HighscoreFactory.getHighscoreTypes().Leaderboard:
            $scope.type = 'leaderboard';
            break;
            
        case HighscoreFactory.getHighscoreTypes().Both:
            $scope.type = 'local and leaderboard';
            break;
            
        default:
            $state.go('gameover', {
                score: $scope.score,
                thirdLast: $scope.thirdLast,
                secondLast: $scope.secondLast,
                lastNumber: $scope.lastNumber,
                highscoreAdded: false,
                highscoreType: $stateParams.highscoreType
            });
    }
    
    $scope.addHighscore = function() {
    	if($scope.highscoreName == null || $scope.highscoreName.trim().length === 0) {
    		$scope.highscoreName = 'Gifted Gamer';
    	}
    	
    	HighscoreFactory.addHighscore($scope.score, $scope.highscoreName).then(function() {
            $state.go('gameover', {
                score: $scope.score,
                thirdLast: $scope.thirdLast,
                secondLast: $scope.secondLast,
                lastNumber: $scope.lastNumber,
                highscoreAdded: true,
                highscoreType: $stateParams.highscoreType
            });
        });
    };
}]);