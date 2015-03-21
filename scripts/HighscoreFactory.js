angular.module('highlow').factory('HighscoreFactory', ['Lodash', 'localStorageService', function(Lodash, localStorageService) {
    'use strict';
    
    var maxScores = 10;
      
    var initializeHighscores = function() {
    	return [
	        { score: 10, name: 'Courtney N. Nagel'},
	        { score: 9, name: 'Olivia R. Spencer'},
	        { score: 8, name: 'Jonathan J. Williams'},
	        { score: 7, name: 'Albert R. Moran'},
	        { score: 6, name: 'Chester T. Eskew'},
	        { score: 5, name: 'Donald D. Rich'},
	        { score: 4, name: 'James N. Paul'},
	        { score: 3, name: 'Anthony L. Drennen'},
	        { score: 2, name: 'Leslie A. Hairston'},
	        { score: 1, name: 'Darrell B. Blume'}
	      ];
    };
      
    var sortHighscores = function(scores) {
    	scores = Lodash.sortByOrder(scores, ['score'], [false]);
    	scores.splice(maxScores, scores.length - maxScores);
    	
    	return scores;
    };
    
    return {
        getHighscores: function() {
        	var scores = localStorageService.get('highscores');
        	
        	if(scores == null) {
        		scores = initializeHighscores();
        	}
        	
        	scores = sortHighscores(scores);
            return scores;
        },
        
        isHighscore: function(score) {
        	var scores = this.getHighscores();
        	return score > scores[scores.length - 1].score;
        },
        
        addHighscore: function(score, name) {
        	var scores = this.getHighscores();
        	scores.push({score: score, name: name});
        	scores = sortHighscores(scores);
        	
			localStorageService.set('previousName', name);
			localStorageService.set('highscores', scores);
        },
        
        getPreviousName: function() {
        	return localStorageService.get('previousName');;
        },
        
        reset: function() {
        	localStorageService.clearAll();
        }
    };
}]);