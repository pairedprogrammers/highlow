angular.module('highlow').factory('HighscoreFactory', ['Lodash', 'localStorageService', '$firebaseArray', '$q', function(Lodash, localStorageService, $firebaseArray, $q) {
    'use strict';
    
    var maxScores = 10;
    var firebaseReference = new Firebase("https://high-low.firebaseio.com/leaderboards");
      
    var initializeLocalScores = function() {
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
    
    var HighscoreType = {
        None: 0,
        Local: 1,
        Leaderboard: 2,
        Both: 3
    };
    Object.freeze(HighscoreType);
    
    var retrieveLocal = function() {
        var local = localStorageService.get('highscores');
        	
        if(local == null) {
            local = initializeLocalScores();
        } else {
            local = JSON.parse(local);
        }

        local = sortHighscores(local);
        
        return local;
    };

    var retrieveLeaderboards = function() {
        return $q(function(resolve, failure) {
            // Firebase only sorts ascending (sadly, yes, this is true).  So our top scores will actually be last in the list.
            var leaderboards = $firebaseArray(firebaseReference.orderByChild('score').limitToLast(maxScores));

            leaderboards.$loaded().then(function() {
                leaderboards.reverse(); // The best scores are at the end, so reverse the list
                resolve(leaderboards);
            }, function() {
                failure();
            });
        });
    };
    
    return {
        getHighscores: function() {
            return $q(function(resolve) {
                var scores = { local: [], leaderboards: null };
                
                scores.local = retrieveLocal();
                retrieveLeaderboards().then(function(leaderboards) {
                    scores.leaderboards = leaderboards;
                    resolve(scores);
                }, function() {
                    resolve(scores);
                });
            });
        },
        
        isHighscore: function(score) {
            var self = this;
            
            return $q(function(resolve) {
                self.getHighscores().then(function(scores) {
                    
                    var type = HighscoreType.None;
                    
                    if(score > scores.local[scores.local.length - 1].score) {
                        type = HighscoreType.Local;
                    }
                    
                    if(scores.leaderboards != null &&
                       (scores.leaderboards.length < maxScores || score > scores.leaderboards[scores.leaderboards.length - 1].score)) {
                        type = type === HighscoreType.Local ? HighscoreType.Both : HighscoreType.Leaderboard;
                    }
                    
                    resolve(type); 
                });
                
            });
        },
        
        getHighscoreTypes: function() {
            return HighscoreType;
        },
        
        addHighscore: function(score, name) {
            var self = this;
            
            return $q(function(resolve) {
                self.isHighscore().then(function(type) {
                    var resolveAtEnd = true;
                    
                    if(type === HighscoreType.Local || type === HighscoreType.Both) {
                        var local = retrieveLocal();
                        local.push({score: score, name: name});
                        local = sortHighscores(local);

                        localStorageService.set('previousName', name);
                        localStorageService.set('highscores', JSON.stringify(local));
                    }
                    
                    if(type === HighscoreType.Leaderboard || type === HighscoreType.Both) {
                        resolveAtEnd = false;
                        localStorageService.set('previousName', name);
                        
                        retrieveLeaderboards().then(function(leaderboards) {
                            leaderboards.$add({score: score, name: name});
                            resolve();
                        }, function() {
                            resolve();
                        });
                    }
                    
                    if(resolveAtEnd) {
                        resolve();
                    }
                });
                
            });
        },
        
        getPreviousName: function() {
        	return localStorageService.get('previousName');
        },
        
        reset: function() {
        	localStorageService.clearAll();
        }
    };
}]);