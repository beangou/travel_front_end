'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:ViewquestionsCtrl
 * @description
 * # ViewquestionsCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('ViewquestionsCtrl', function ($scope, $http, $routeParams, alertService, userService, $location) {

    $scope.params = $routeParams;

    $scope.viewQuestions = function() {
      var postObject = new Object();
      postObject.pageIndex = $scope.params.pageIndex;
      postObject.pageSize  = $scope.params.pageSize;
      $http.post('/app/v1/questions', postObject)
        .error(function(data) {
          alertService.add('danger', data.error.message);
        })
        .success(function(data) {
          $scope.questions = data;
        });
    };

    $scope.viewQuestions();
  });
