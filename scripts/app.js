angular.module('highlow', ['ui.router', 'ui.bootstrap', 'LocalStorageModule', 'cfp.hotkeys', 'ngTouch'])
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
                params: { score: null, thirdLast: null, secondLast: null, lastNumber: null },
                controller: 'HighscoreEntryCtrl'
            })
            .state('gameover', {
                templateUrl: 'views/gameover.html',
                params: { score: null, thirdLast: null, secondLast: null, lastNumber: null, highscoreAdded: false },
                controller: 'GameOverCtrl'
            });
    }])
    .config(['localStorageServiceProvider', function (localStorageServiceProvider) {
  		localStorageServiceProvider
    		.setPrefix('highlow');
	}]);;