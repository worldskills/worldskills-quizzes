(function () {
    'use strict';

    angular.module('quizzesApp').directive('alerts', function(alert) {
        return {
            restrict: 'E',
            scope: {},
            templateUrl: 'views/alerts.html',
            link: function (scope, element, attrs) {
                scope.alert = alert;
                scope.close = function (index) {
                    alert.messages.splice(index, 1);
                };
                alert.setAllDisplayed();
            }
        };
    });

})();
