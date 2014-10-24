(function () {
    'use strict';

    angular.module('quizzesApp').directive('spinner', function($interval) {
        return {
            restrict: 'E',
            link: function(scope, element, attrs) {
                var i = 0;
                $interval(function () {
                    i = (i + 1) % 4;
                    var loading = '';
                    for (var j = 0; j < 3; j++) {
                        if (j < i) {
                            loading += '.';
                        } else {
                            loading += '&nbsp;';
                        }
                    }
                    element.html(loading);
                }, 300);
            }
        };
    });

})();
