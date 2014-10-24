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
