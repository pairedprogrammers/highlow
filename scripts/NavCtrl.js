angular.module('highlow').controller('NavCtrl', ['$scope', '$location', '$modal', 'hotkeys',
function($scope, $location, $modal, hotkeys) {
    'use strict';

    $scope.showHighscores = function() {
        var modalInstance = $modal.open({
            templateUrl: 'views/highscores.html',
            controller: 'HighscoreCtrl'
        });

        modalInstance.result.then(function() {
        }, function() {
        });
    };
    
    $scope.showAbout = function() {
        var modalInstance = $modal.open({
            templateUrl: 'views/about.html',
            controller: 'AboutCtrl'
        });

        modalInstance.result.then(function() {
        }, function() {
        });
    };
    
	hotkeys.add({
		combo: 'h',
		description: 'Display the highscores',
		callback: function() {
			$scope.showHighscores();
		}
	});
    
	hotkeys.add({
		combo: 'ctrl+alt+i',
		description: 'Display the About dialog',
		callback: function() {
			$scope.showAbout();
		}
	});
}]);