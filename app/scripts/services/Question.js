(function() {
    'use strict';

    angular.module('quizzesApp').service('Question', function($resource, WORLDSKILLS_API_QUIZZES) {
        return $resource(WORLDSKILLS_API_QUIZZES + '/questions/:id', {
            id: '@id',
            quizId: '@quizId'
        }, {
            save: {
                method: 'POST',
                url: WORLDSKILLS_API_QUIZZES + '/:quizId/questions',
            },
            update: {
                method: 'PUT'
            }
        });
    });
})();
