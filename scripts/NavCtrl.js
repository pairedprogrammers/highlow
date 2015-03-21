angular.module('highlow').controller('NavCtrl', ['$scope', '$location', '$modal', function($scope, $location, $modal) {
    'use strict';

    $scope.showHighscores = function() {
        $scope.items = ['item1', 'item2', 'item3'];
        var modalInstance = $modal.open({
            templateUrl: 'views/highscores.html',
            controller: 'HighscoreCtrl',
            resolve: {
                items: function() {
                    return $scope.items;
                }
            }
        });

        modalInstance.result.then(function(selectedItem) {
            $scope.selected = selectedItem;
        }, function() {
        });
    };
}]);