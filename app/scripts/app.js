(function() {
    'use strict';

    var quizzesApp = angular.module('quizzesApp', [
        'ngResource', 'ngSanitize', 'ui.router', 'ui.bootstrap', 'ui.select2', 'pascalprecht.translate', 'angularFileUpload', 'worldskills.utils'
    ]);

    quizzesApp.config(function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise(function ($injector, $location) {
            // check for existing redirect
            var $state = $injector.get('$state');
            var redirectToState = sessionStorage.getItem('redirect_to_state');
            var redirectToParams = sessionStorage.getItem('redirect_to_params');
            sessionStorage.removeItem('redirect_to_state');
            sessionStorage.removeItem('redirect_to_params');
            if (redirectToState) {
                if (redirectToParams) {
                    redirectToParams = angular.fromJson(redirectToParams);
                } else {
                    redirectToParams = {};
                }
                $state.go(redirectToState, redirectToParams);
            } else {
                $state.go('quizzes.list');
            }
        });
        $stateProvider.state('quizzes', {
            url: '/quizzes',
            templateUrl: 'views/quizzes.html',
            controller: 'QuizzesCtrl',
            abstract: true
        }).state('quizzes.list', {
            url: '?page&sort',
            templateUrl: 'views/quizzes-list.html',
            controller: 'QuizzesListCtrl',
            data: {
                requireLoggedIn: true
            },
            reloadOnSearch: false
        }).state('quiz_create', {
            url: '/quizzes/create',
            templateUrl: 'views/quiz-create.html',
            controller: 'QuizCreateCtrl',
            abstract: true
        }).state('quiz_create.form', {
            url: '',
            templateUrl: 'views/quiz-form.html',
            controller: 'QuizFormCtrl',
            data: {
                requireLoggedIn: true
            }
        }).state('quizzes.quiz', {
            url: '/{id}',
            templateUrl: 'views/quiz.html',
            controller: 'QuizCtrl',
            abstract: true
        }).state('quizzes.quiz.form', {
            url: '',
            templateUrl: 'views/quiz-form.html',
            controller: 'QuizFormCtrl',
            data: {
                requireLoggedIn: true
            }
        }).state('quizzes.quiz.questions', {
            url: '/questions',
            templateUrl: 'views/quiz-questions.html',
            controller: 'QuizQuestionsCtrl',
            data: {
                requireLoggedIn: true
            }
        }).state('quizzes.quiz.translations', {
            url: '/translations',
            templateUrl: 'views/quiz-translations.html',
            controller: 'QuizTranslationsCtrl',
            data: {
                requireLoggedIn: true
            }
        }).state('quizzes.quiz.attempts', {
            url: '/attempts',
            templateUrl: 'views/quiz-attempts.html',
            controller: 'QuizAttemptsCtrl',
            data: {
                requireLoggedIn: true
            }
        }).state('quizzes.question_create', {
            url: '/{quizId}/questions/create',
            templateUrl: 'views/question-create.html',
            controller: 'QuestionCreateCtrl',
            abstract: true
        }).state('quizzes.question_create.form', {
            url: '',
            templateUrl: 'views/question-form.html',
            controller: 'QuestionFormCtrl',
            data: {
                requireLoggedIn: true
            }
        }).state('quizzes.question', {
            url: '/questions/{id}',
            templateUrl: 'views/question.html',
            controller: 'QuestionCtrl',
            abstract: true
        }).state('quizzes.question.form', {
            url: '',
            templateUrl: 'views/question-form.html',
            controller: 'QuestionFormCtrl',
            data: {
                requireLoggedIn: true
            }
        }).state('quizzes.translation_create', {
            url: '/{quizId}/translations/create',
            templateUrl: 'views/translation-create.html',
            controller: 'TranslationCreateCtrl',
            abstract: true
        }).state('quizzes.translation_create.form', {
            url: '',
            templateUrl: 'views/translation-form.html',
            controller: 'TranslationFormCtrl',
            data: {
                requireLoggedIn: true
            }
        }).state('quizzes.translation', {
            url: '/{quizId}/translations/{locale}',
            templateUrl: 'views/translation.html',
            controller: 'TranslationCtrl',
            abstract: true
        }).state('quizzes.translation.form', {
            url: '',
            templateUrl: 'views/translation-form.html',
            controller: 'TranslationFormCtrl',
            data: {
                requireLoggedIn: true
            }
        }).state('quiz', {
            url: '/quiz/{id}',
            templateUrl: 'views/quiz-attempt.html',
            controller: 'QuizAttemptCtrl',
            data: {
                requireLoggedIn: true
            }
        });
    });

    quizzesApp.config(function($uiViewScrollProvider) {
        $uiViewScrollProvider.useAnchorScroll();
    });

    quizzesApp.config(function($translateProvider) {

        $translateProvider.useStaticFilesLoader({
            prefix: 'languages/',
            suffix: '.json'
        });

        $translateProvider.preferredLanguage('en');
        $translateProvider.fallbackLanguage('en');
    });
    
    quizzesApp.run(function ($rootScope, $state, $stateParams) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
    });
})();
