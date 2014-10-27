(function() {
    'use strict';

    angular.module('quizzesApp').service('QuizAttempt', function($resource, WORLDSKILLS_API_QUIZZES) {
        return $resource(WORLDSKILLS_API_QUIZZES + '/:id/attempts', {
            id: '@id'
        }, {
        });
    });

    angular.module('quizzesApp').service('Attempt', function($resource, WORLDSKILLS_API_QUIZZES) {
        return $resource(WORLDSKILLS_API_QUIZZES + '/attempts/:id/:action', {
            id: '@id'
        }, {
            finish: {
                method: 'PUT',
                params: {'action': 'finish'}
            }
        });
    });

    angular.module('quizzesApp').service('AttemptQuestionAnswer', function($resource, WORLDSKILLS_API_QUIZZES) {
        return $resource(WORLDSKILLS_API_QUIZZES + '/attempts/:id/questions/:question/answers/:answer', {
            id: '@id',
            question: '@question',
            answer: '@answer'
        }, {
            update: {
                method: 'PUT'
            }
        });
    });
})();
