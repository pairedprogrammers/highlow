angular.module('highlow', ['ui.router', 'ui.bootstrap', 'LocalStorageModule', 'cfp.hotkeys', 'ngTouch', 'firebase'])
    .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    	'use strict';
    	
        //
        // For any unmatched url, redirect to /game
        $urlRouterProvider.otherwise('/');
        //
        // Now set up the states
        $stateProvider
            .state('game', {
                url: '/',
                templateUrl: 'views/game.html',
                controller: 'GameCtrl'
            })
            .state('highscoreentry', {
                templateUrl: 'views/highscoreentry.html',
                params: { score: null, thirdLast: null, secondLast: null, lastNumber: null, highscoreType: null },
                controller: 'HighscoreEntryCtrl'
            })
            .state('gameover', {
                templateUrl: 'views/gameover.html',
                params: { score: null, thirdLast: null, secondLast: null, lastNumber: null, highscoreAdded: false, highscoreType: null },
                controller: 'GameOverCtrl'
            });
    }])
    .config(['localStorageServiceProvider', function (localStorageServiceProvider) {
  		localStorageServiceProvider
    		.setPrefix('highlow');
	}])
    .filter('truncate', function () {
        return function (text, length, end) {
            if (isNaN(length)) {
                length = 10;
            }
 
            if (end === undefined) {
                end = "...";
            }
 
            if (text.length <= length || text.length - end.length <= length) {
                return text;
            }
            else {
                return String(text).substring(0, length-end.length) + end;
            }
 
        };
    });