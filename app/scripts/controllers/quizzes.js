(function() {
    'use strict';

    angular.module('quizzesApp').controller('QuizzesCtrl', function($scope) {
        $scope.pagination = {
            currentPage: 1,
            itemsPerPage: 15,
            sort: 'start_date_desc'
        };
    });

    angular.module('quizzesApp').controller('QuizzesListCtrl', function($scope, $stateParams) {
        
    });

    angular.module('quizzesApp').controller('QuizAttemptCtrl', function($scope, $stateParams, $window, Quiz, QuizAttempt, Attempt, AttemptQuestionAnswer) {
        $scope.id = $stateParams.id;
        $scope.alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
        $scope.quiz = Quiz.get({id: $scope.id});
        $scope.questions = {};
        $scope.attempt = QuizAttempt.save({id: $scope.id}, function () {
            $scope.attempt.questions.forEach(function (question) {
                if (question.answer !== null) {
                    $scope.questions[question.id] = question.answer.id;
                }
            });
        });
        $scope.selectAnswer = function () {
            var questionId = this.question.id;
            var answerId = this.answer.id;
            AttemptQuestionAnswer.update({id: $scope.attempt.id, question: questionId, answer: answerId});
        };
        $scope.finish = function () {
            Attempt.finish({id: $scope.attempt.id}, function (attempt) {
                $scope.attempt = attempt;
            });
        };
        $scope.retry = function () {
            $window.location.reload();
        };
    });

})();
