angular.module('highlow').controller('GameCtrl', ['$scope',  'GameFactory', 'HighscoreFactory', function($scope, GameFactory, HighscoreFactory) {
    'use strict';
    
    $scope.low = 0;
    $scope.high = 99;
    
    var game;
    
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
        
        if(!game.isInProgress() && HighscoreFactory.isHighscore($scope.score)) {
        	$scope.highscoreName = HighscoreFactory.getPreviousName();
        	$scope.highscore = true;
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
    };
    
    $scope.addHighscore = function() {
    	HighscoreFactory.addHighscore($scope.score, $scope.highscoreName);
    	$scope.highscore = false;
    	$scope.highscoreAccepted = true;
    };
    
    $scope.newGame();
}]);