angular.module('highlow').controller('GameCtrl', ['$scope', '$state', 'GameFactory', 'hotkeys', 'HighscoreFactory',
function($scope, $state, GameFactory, hotkeys, HighscoreFactory) {
    'use strict';
    
    $scope.low = 0;
    $scope.high = 99;
    
    var updateScreen = function() {
    	$scope.thirdLast = '';
    	$scope.secondLast = '';
        $scope.score = $scope.game.getScore();
        
        var previousNumbers = $scope.game.getPreviousNumbers();
        if(previousNumbers.length > 0) {
        	$scope.lastNumber = previousNumbers[previousNumbers.length - 1];
        }
        if(previousNumbers.length > 1) {
        	$scope.secondLast = previousNumbers[previousNumbers.length - 2];
        }
        if(previousNumbers.length > 2) {
        	$scope.thirdLast = previousNumbers[previousNumbers.length - 3];
        }
        
        // Game is no longer in progress
        if(!$scope.game.isInProgress()) {
            HighscoreFactory.isHighscore($scope.score).then(function(type) {
                $state.go(HighscoreFactory.isHighscore($scope.score) ? 'highscoreentry' : 'gameover', {
                    score: $scope.score,
                    thirdLast: $scope.thirdLast,
                    secondLast: $scope.secondLast,
                    lastNumber: $scope.lastNumber,
                    highscoreType: type
                });
            });
        }
    };
    
    $scope.lower = function() {
        $scope.game.lower();
        updateScreen();
    };
    
    $scope.higher = function() {
        $scope.game.higher();
        updateScreen();
    };
    
    $scope.game = GameFactory.createNew($scope.low, $scope.high);
    updateScreen();
    
	hotkeys.bindTo($scope).add({
		combo: 'down',
		description: 'The next number will be lower',
		callback: function() {
			$scope.lower();
		}
	});
    
	hotkeys.bindTo($scope).add({
		combo: 'up',
		description: 'The next number will be higher',
		callback: function() {
			$scope.higher();
		}
	});
}]);