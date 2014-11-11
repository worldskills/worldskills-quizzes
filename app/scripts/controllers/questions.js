(function() {
    'use strict';

    angular.module('quizzesApp').controller('QuestionCtrl', function($scope, $stateParams, $state, $http, WorldSkills, alert, Question, Answer) {
        $scope.id = $stateParams.id;
        $scope.answers = [];
        $scope.question = Question.get({id: $scope.id}, function (question) {
            var url = WorldSkills.getLink(question.links, 'answers');
            $http({method: 'GET', url: url}).success(function(data, status, headers, config) {
                data.answers.forEach(function (answer) {
                    $scope.answers.push(new Answer(answer));
                });
            });
        });
        $scope.deleteQuestion = function() {
            if (alert.confirm('Deleting the Question will also delete all answers. Click OK to proceed.')) {
                $scope.deleteLoading = true;
                $scope.question.$delete(function () {
                    alert.success('The Question has been deleted successfully.');
                    $state.go('quizzes.quiz.questions', {id: $scope.question.quiz.id});
                });
            }
        };
    });

    angular.module('quizzesApp').controller('QuestionCreateCtrl', function($scope, $stateParams, Question, Quiz, Answer) {
        $scope.question = new Question();
        $scope.question.text = {text: '', lang_code: 'en'};
        $scope.question.quiz = Quiz.get({id: $stateParams.quizId}, function (quiz) {
            $scope.question.quizId = quiz.id;
        });
        $scope.answers = [];
        for (var i = 0; i < 4; i++) {
            var answer = new Answer();
            answer.text = {text: '', lang_code: 'en'};
            answer.correct = false;
            answer.sort = i + 1;
            $scope.answers.push(answer);
        }
    });

    angular.module('quizzesApp').controller('QuestionFormCtrl', function($scope, $stateParams, $state, $http, WorldSkills, alert, Question, Answer) {
        $scope.save = function() {
            $scope.submitted = true;
            if ($scope.form.$valid) {
                var hasCorrect = false;
                $scope.answers.forEach(function (a) {
                    if (a.correct === true) {
                        hasCorrect = true;
                    }
                });
                if (hasCorrect === false) {
                    window.alert('Please mark at least one answer as correct!');
                    return;
                }
                $scope.loading = true;
                if ($scope.question.id) {
                    $scope.question.$update(function (question) {
                        $scope.answers.forEach(function (answer) {
                            answer.questionId = question.id;
                            if (answer.id) {
                                if (!answer.removed) {
                                    answer.$update();
                                } else {
                                    answer.$delete();
                                }
                            } else {
                                if (!answer.removed && answer.text.text !== '') {
                                    answer.$save();
                                }
                            }
                        });
                        alert.success('The Question has been updated successfully.');
                        $state.go('quizzes.quiz.questions', {id: $scope.question.quiz.id});
                    });
                } else {
                    var url = WorldSkills.getLink($scope.question.quiz.links, 'questions');
                    $http({method: 'GET', url: url}).success(function(data, status, headers, config) {
                        var maxSort = 0;
                        data.questions.forEach(function (question) {
                            maxSort = Math.max(maxSort, question.sort);
                        });
                        $scope.question.sort = maxSort + 1;
                        $scope.question.$save(function (question) {
                            $scope.answers.forEach(function (answer) {
                                answer.questionId = question.id;
                                if (!answer.removed && answer.text.text !== '') {
                                    answer.$save();
                                }
                            });
                            alert.success('The Question has been added successfully.');
                            $state.go('quizzes.quiz.questions', {id: $scope.question.quiz.id});
                        });
                    });
                }
            }
        };
        $scope.changeCorrect = function (answer) {
            $scope.answers.forEach(function (a) {
                if (a !== answer) {
                    a.correct = false;
                }
            });
        };
        $scope.removeAnswer = function(answer) {
            answer.removed = true;
        };
        $scope.restoreAnswer = function(answer) {
            answer.removed = false;
        };
        $scope.addAnswer = function() {
            var answer = new Answer();
            answer.text = {text: '', lang_code: 'en'};
            answer.correct = false;
            answer.sort = $scope.answers.length + 1;
            $scope.answers.push(answer);
        };
    });
})();
