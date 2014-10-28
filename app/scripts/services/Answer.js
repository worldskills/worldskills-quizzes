(function() {
    'use strict';

    angular.module('quizzesApp').service('Answer', function($resource, WORLDSKILLS_API_QUIZZES) {
        return $resource(WORLDSKILLS_API_QUIZZES + '/answers/:id', {
            id: '@id',
            questionId: '@questionId'
        }, {
            save: {
                method: 'POST',
                url: WORLDSKILLS_API_QUIZZES + '/questions/:questionId/answers',
            },
            update: {
                method: 'PUT'
            }
        });
    });
})();
