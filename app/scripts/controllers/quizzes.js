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

    angular.module('quizzesApp').controller('QuizCtrl', function($scope, $stateParams, $state, $q, $http, alert, Quiz) {
        $scope.id = $stateParams.id;
        $scope.translations = [];
        $scope.translationsLoading = true;
        $scope.quiz = Quiz.get({id: $scope.id}, function (quiz) {
            $scope.title = quiz.title.text;
            var translationPromises = [];
            angular.forEach($scope.quiz.links, function (link) {
                if (link.rel == 'i18n') {
                    translationPromises.push($http({method: 'GET', url: link.href}).success(function(data, status, headers, config) {
                        $scope.translations.push(new Quiz(data));
                    }));
                }
            });
            $q.all(translationPromises).then(function() {
                $scope.translationsLoading = false;
            });
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

    angular.module('quizzesApp').controller('QuizFormCtrl', function($scope, $stateParams, $state, $http, alert, Quiz, WORLDSKILLS_API_AUTH, WORLDSKILLS_API_EVENTS) {
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
            url: WORLDSKILLS_API_EVENTS + '/',
            params: {
                limit: 100,
                l: 'en',
                sort: 'start_date_desc',
                type: 'competition'
            }
        }).success(function(data, status, headers, config) {
            $scope.events = data.events;
        });
        $scope.changeEvent = function () {
            $scope.loadSkills();
            $scope.quiz.skill = null;
        };
        $scope.loadSkills = function () {
            if (typeof $scope.quiz.event != 'undefined' && $scope.quiz.event) {
                $http({
                    method: 'GET',
                    url: WORLDSKILLS_API_EVENTS + '/' + $scope.quiz.event.id + '/skills',
                    params: {
                        limit: 100,
                        l: 'en',
                        sort: 'name_asc'
                    }
                }).success(function(data, status, headers, config) {
                    $scope.skills = data.skills;
                });
            } else {
                $scope.skills = [];
            }
        };
        $scope.quiz.$promise.then(function (data) {
            $scope.loadSkills();
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
        $scope.quiz.$promise.then(function (data) {
            var url = WorldSkills.getLink(data.links, 'questions');
            $http({method: 'GET', url: url}).success(function(data, status, headers, config) {
                $scope.questions = data.questions;
            });
        });
        $scope.txt = function (html) {
            return String(html).replace(/<[^>]+>/gm, '');
        };
    });

    angular.module('quizzesApp').controller('QuizTranslationsCtrl', function() {
    });

    angular.module('quizzesApp').controller('TranslationCtrl', function($scope, $stateParams, Quiz, Question, Answer, WorldSkills, $http, $q, $state, $translate, alert) {
        $scope.quizId = $stateParams.quizId;
        $scope.locale = $stateParams.locale;
        $scope.questionsLoading = true;
        $scope.quiz = Quiz.get({id: $scope.quizId}, function () {
            $translate($scope.locale).then(function (language) {
                $scope.title = language + ' Tanslation ' + $scope.quiz.title.text;
            });
        });
        $scope.translation = Quiz.get({id: $scope.quizId, l: $scope.locale}, function () {
            var url = WorldSkills.getLink($scope.translation.links, 'questions');
            var promises = [];
            var request = $http({method: 'GET', url: url});
            promises.push(request);
            request.success(function(data, status, headers, config) {
                $scope.questions = [];
                data.questions.forEach(function (question) {
                    question = Question.get({id: question.id, l: $scope.locale});
                    $scope.questions.push(question);
                });
            });
            $q.all(promises).then(function() {
                $scope.questionsLoading = false;
            });
        });
    });

    angular.module('quizzesApp').controller('TranslationCreateCtrl', function($scope, $stateParams, Quiz, Question, WorldSkills, $http, $q) {
        $scope.quizId = $stateParams.quizId;
        $scope.questionsLoading = true;
        $scope.quiz = Quiz.get({id: $scope.quizId}, function (quiz) {
            $scope.translation = angular.copy($scope.quiz);
            $scope.translation.title.lang_code = '';
            $scope.translation.title.text = '';
            var url = WorldSkills.getLink($scope.quiz.links, 'questions');
            var promises = [];
            var request = $http({method: 'GET', url: url});
            promises.push(request);
            request.success(function(data, status, headers, config) {
                $scope.questions = [];
                data.questions.forEach(function (question) {
                    question = Question.get({id: question.id});
                    $scope.questions.push(question);
                });
            });
            $q.all(promises).then(function() {
                $scope.questionsLoading = false;
            });
        });
    });

    angular.module('quizzesApp').controller('TranslationFormCtrl', function($scope, $stateParams, Quiz, Answer, $http, $state, $q, alert) {
        $scope.loading = false;
        $scope.save = function() {
            var promises = [];
            $scope.submitted = true;
            if ($scope.form.$valid) {
                $scope.loading = true;
                var langCode = $scope.translation.title.lang_code;
                promises.push($scope.translation.$update({l: langCode}, function () {
                    $scope.questions.forEach(function (question) {
                        question.text.lang_code = langCode;
                        promises.push(question.$update({l: langCode}));
                        question.answers.forEach(function (answer) {
                            answer.text.lang_code = langCode;
                            promises.push(Answer.update({l: langCode}, answer));
                        });
                    });
                }));
                $q.all(promises).then(function() {
                    alert.success('The translation has been updated successfully.');
                    $state.go('quizzes.quiz.translations', {id: $scope.quiz.id});
                });
            }
        };
    });

    angular.module('quizzesApp').controller('QuizAttemptsCtrl', function($scope, $stateParams, $http, $translate, $state, WorldSkills) {
        $scope.quiz.$promise.then(function (data) {
            var url = WorldSkills.getLink(data.links, 'attempts');
            $http({method: 'GET', url: url}).success(function(data, status, headers, config) {
                $scope.attempts = data.attempts;
            });
        });
    });

    angular.module('quizzesApp').controller('QuizAttemptCtrl', function($scope, $stateParams, $window, $q, Quiz, QuizAttempt, Attempt, AttemptQuestionAnswer) {
        var promises = [];
        var language = $window.navigator.language || $window.navigator.userLanguage;
        language = language.substring(0, 2);
        $scope.id = $stateParams.id;
        $scope.alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
        $scope.loading = true;
        $scope.finishLoading = false;
        $scope.quiz = Quiz.get({id: $scope.id, l: language}, function () {
        }, function (response) {
            $scope.loading = false;
            $scope.quizError = response;
        });
        $scope.questions = {};
        $scope.attempt = QuizAttempt.save({id: $scope.id, l: language}, {}, function (attempt) {
            $scope.loading = false;
            attempt.questions.forEach(function (question) {
                if (question.answer !== null) {
                    $scope.questions[question.id] = question.answer.id;
                }
            });
        }, function (response) {
            $scope.loading = false;
            $scope.attemptError = response;
        });
        $scope.selectAnswer = function () {
            var questionId = this.question.id;
            var answerId = this.answer.id;
            promises.push(AttemptQuestionAnswer.update({id: $scope.attempt.id, question: questionId, answer: answerId, l: language}, {}).$promise);
        };
        $scope.finish = function () {
            $scope.finishLoading = true;
            $q.all(promises).then(function() {
                Attempt.finish({id: $scope.attempt.id, l: language}, {}, function (attempt) {
                    $scope.attempt = attempt;
                    $scope.finishLoading = false;
                    $('body,html').animate({scrollTop: 0});
                });
            });
        };
        $scope.retry = function () {
            $window.location.reload();
        };
    });

})();
