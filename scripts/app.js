angular.module('highlow', ['ui.router', 'ui.bootstrap', 'LocalStorageModule', 'cfp.hotkeys'])
    .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    	'use strict';
    	
        //
        // For any unmatched url, redirect to /game
        $urlRouterProvider.otherwise('/game');
        //
        // Now set up the states
        $stateProvider
            .state('game', {
                url: '/game',
                templateUrl: 'views/game.html',
                controller: 'GameCtrl'
            })
            .state('highscores', {
                url: '/highscores',
                templateUrl: 'views/highscores.html',
                controller: 'HighscoresCtrl'
            });
    }])
    .config(['localStorageServiceProvider', function (localStorageServiceProvider) {
  		localStorageServiceProvider
    		.setPrefix('highlow');
	}]);;