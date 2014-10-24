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

    angular.module('quizzesApp').controller('QuizAttemptCtrl', function($scope, $stateParams, Quiz, QuizAttempt) {
        $scope.id = $stateParams.id;
        $scope.alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
        $scope.quiz = Quiz.get({id: $scope.id});
        $scope.attempt = QuizAttempt.save({id: $scope.id});
        console.log($scope.attempt)
    });

})();
