(function() {
    'use strict';

    angular.module('quizzesApp').service('QuizAttempt', function($resource, WORLDSKILLS_API_QUIZZES) {
        return $resource(WORLDSKILLS_API_QUIZZES + '/:id/attempts', {
            id: '@id'
        });
    });
})();
