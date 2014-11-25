(function() {
    'use strict';

    angular.module('quizzesApp').controller('QuizzesCtrl', function($scope) {
        $scope.pagination = {
            currentPage: 1,
            itemsPerPage: 15
        };
    });

    angular.module('quizzesApp').controller('QuizzesListCtrl', function($scope, $stateParams, $location, Quiz) {
        var page = parseInt($stateParams.page, 10);
        if (page) {
            $scope.pagination.currentPage = page;
        } else {
            $location.search('page', $scope.pagination.currentPage);
        }
        $scope.load = function (page) {
            $scope.loading = true;
            $scope.quizzes = [];
            var filters = angular.copy($scope.filters);
            filters.offset = $scope.pagination.itemsPerPage * (page - 1); 
            Quiz.query(filters, function (data) {
                $scope.loading = false;
                $scope.quizzes = data.quizzes;
                $scope.totalCount = data.total_count;
                $scope.pagination.currentPage = page;
            });
        };
        $scope.changePage = function (page) {
            $location.search('page', page);
            $scope.load(page);
        };
        $scope.clear = function () {
            $scope.filters = {
                limit: $scope.pagination.itemsPerPage
            };
            $scope.load($scope.pagination.currentPage);
        };
        $scope.clear();
    });

    angular.module('quizzesApp').controller('QuizCtrl', function($scope, $stateParams, $state, alert, Quiz) {
        $scope.id = $stateParams.id;
        $scope.quiz = Quiz.get({id: $scope.id}, function (quiz) {
            $scope.title = quiz.title.text;
        });
        $scope.deleteQuiz = function() {
            if (alert.confirm('Deleting the Quiz will also delete all questions and attempts. Click OK to proceed.')) {
                $scope.deleteLoading = true;
                $scope.quiz.$delete(function () {
                    alert.success('The Quiz has been deleted successfully.');
                    $state.go('quizzes.list');
                });
            }
        };
    });

    angular.module('quizzesApp').controller('QuizCreateCtrl', function($scope, Quiz) {
        $scope.quiz = new Quiz();
        $scope.quiz.title = {text: '', lang_code: 'en'};
    });

    angular.module('quizzesApp').controller('QuizFormCtrl', function($scope, $stateParams, $state, $http, alert, Quiz, WORLDSKILLS_API_AUTH, WORLDSKILLS_API_EVENTS, WORLDSKILLS_COMPETITION_ID) {
        var ROLE_EDIT_QUIZZES = 'EditQuizzes';
        var ROLE_APP_QUIZZES = '1300';
        $http({
            method: 'GET',
            url: WORLDSKILLS_API_AUTH + '/ws_entities',
            params: {
                limit: 100,
                role: ROLE_EDIT_QUIZZES,
                roleApp: ROLE_APP_QUIZZES
            }
        }).success(function(data, status, headers, config) {
            $scope.entities = data.ws_entity_list;
        });
        $http({
            method: 'GET',
            url: WORLDSKILLS_API_EVENTS + '/' + WORLDSKILLS_COMPETITION_ID + '/skills',
            params: {
                limit: 100,
                l: 'en',
                sort: 'name_asc'
            }
        }).success(function(data, status, headers, config) {
            $scope.skills = data.skills;
        });
        $scope.save = function() {
            $scope.submitted = true;
            if ($scope.form.$valid) {
                $scope.loading = true;
                if ($scope.quiz.id) {
                    $scope.quiz.$update(function () {
                        alert.success('The Quiz has been saved successfully.');
                        $state.go('quizzes.list');
                    }, function (response) {
                        window.alert('Error saving Quiz.');
                        $scope.loading = false;
                    });
                } else {
                    $scope.quiz.$save(function (quiz) {
                        alert.success('The Quiz has been added successfully. Please add now questions for the Quiz.');
                        $state.go('quizzes.quiz.questions', {id: quiz.id});
                    }, function (response) {
                        if (response.status == 401) {
                            window.alert('Insufficient permissions for to adding a new Quiz to this entity.');
                        } else {
                            window.alert('Error while adding Quiz.');
                        }
                        $scope.loading = false;
                    });
                }
            }
        };
    });

    angular.module('quizzesApp').controller('QuizQuestionsCtrl', function($scope, $stateParams, $http, $translate, $state, WorldSkills) {
        $scope.quiz.$promise.then(function(data) {
            var url = WorldSkills.getLink(data.links, 'questions');
            $http({method: 'GET', url: url}).success(function(data, status, headers, config) {
                $scope.questions = data.questions;
            });
        });
        $scope.txt = function (html) {
            return String(html).replace(/<[^>]+>/gm, '');
        };
    });

    angular.module('quizzesApp').controller('QuizAttemptsCtrl', function($scope, $stateParams, $http, $translate, $state, WorldSkills) {
        $scope.quiz.$promise.then(function(data) {
            var url = WorldSkills.getLink(data.links, 'attempts');
            $http({method: 'GET', url: url}).success(function(data, status, headers, config) {
                $scope.attempts = data.attempts;
            });
        });
    });

    angular.module('quizzesApp').controller('QuizAttemptCtrl', function($scope, $stateParams, $window, Quiz, QuizAttempt, Attempt, AttemptQuestionAnswer) {
        $scope.id = $stateParams.id;
        $scope.alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
        $scope.quiz = Quiz.get({id: $scope.id}, function () {
        }, function (response) {
            $scope.quizError = response;
        });
        $scope.questions = {};
        $scope.attempt = QuizAttempt.save({id: $scope.id}, function () {
            $scope.attempt.questions.forEach(function (question) {
                if (question.answer !== null) {
                    $scope.questions[question.id] = question.answer.id;
                }
            });
        }, function (response) {
            $scope.attemptError = response;
        });
        $scope.selectAnswer = function () {
            var questionId = this.question.id;
            var answerId = this.answer.id;
            AttemptQuestionAnswer.update({id: $scope.attempt.id, question: questionId, answer: answerId});
        };
        $scope.finish = function () {
            Attempt.finish({id: $scope.attempt.id}, function (attempt) {
                $scope.attempt = attempt;
                $('body,html').animate({scrollTop: 0});
            });
        };
        $scope.retry = function () {
            $window.location.reload();
        };
    });

})();
