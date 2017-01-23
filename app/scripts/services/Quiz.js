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

    angular.module('quizzesApp').service('QuizTranslation', function($resource, WORLDSKILLS_API_QUIZZES) {
        return $resource(WORLDSKILLS_API_QUIZZES + '/:id/translations/:locale', {
            id: '@id',
            locale: '@locale'
        });
    });

})();
