(function() {
    'use strict';

    angular.module('quizzesApp').controller('ContainerCtrl', function($scope, auth, alert) {
        $scope.auth = auth;
        $scope.logout = function (e) {
            auth.logout();
        };
        $scope.$on('$stateChangeStart', function () {
            alert.clear();
        });
    });
})();
