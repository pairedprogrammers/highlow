angular.module('highlow').controller('GameCtrl', ['$scope',  'GameFactory', 'HighscoreFactory', 'hotkeys',
function($scope, GameFactory, HighscoreFactory, hotkeys) {
    'use strict';
    
    $scope.low = 0;
    $scope.high = 99;
    
    var game;
    
    var setupNewGameHotKey = function() {
		hotkeys.add({
			combo: 'n',
			description: 'Start a new game',
			callback: function() {
				$scope.newGame();
			}
		});
    };
    
    var updateScreen = function() {
    	$scope.thirdLast = '';
    	$scope.secondLast = '';
        $scope.score = game.getScore();
        $scope.inprogress = game.isInProgress();
        
        var previousNumbers = game.getPreviousNumbers();
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
        if(!game.isInProgress()) {
        	hotkeys.del('down');
        	hotkeys.del('up');
        	
        	// A highscore was set
        	if(HighscoreFactory.isHighscore($scope.score)) {
        		$scope.highscoreName = HighscoreFactory.getPreviousName();
	        	$scope.highscore = true;
        	} else {
        		setupNewGameHotKey();
        	}
        }
    };
    
    $scope.lower = function() {
        game.lower();
        updateScreen();
    };
    
    $scope.higher = function() {
        game.higher();
        updateScreen();
    };
    
    $scope.newGame = function() {
        game = GameFactory.createNew($scope.low, $scope.high);
        $scope.highscoreName = '';
        $scope.highscoreAccepted = false;
        updateScreen();
        hotkeys.del('n');
        
		hotkeys.add({
			combo: 'down',
			description: 'The next number will be lower',
			callback: function() {
				$scope.lower();
			}
		});
	    
		hotkeys.add({
			combo: 'up',
			description: 'The next number will be higher',
			callback: function() {
				$scope.higher();
			}
		});
    };
    
    $scope.addHighscore = function() {
    	HighscoreFactory.addHighscore($scope.score, $scope.highscoreName);
    	$scope.highscore = false;
    	$scope.highscoreAccepted = true;
		setupNewGameHotKey();
    };
    
    $scope.newGame();
}]);