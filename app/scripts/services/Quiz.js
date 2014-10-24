(function() {
    'use strict';

    angular.module('quizzesApp').service('Quiz', function($resource, WORLDSKILLS_API_QUIZZES) {
        return $resource(WORLDSKILLS_API_QUIZZES + '/:id', {
            id: '@id'
        }, {
            query: {
                method: 'GET'
            },
            update: {
                method: 'PUT'
            }
        });
    });
})();
