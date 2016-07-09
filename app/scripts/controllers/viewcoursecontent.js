'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:ViewcontentCtrl
 * @description
 * # ViewcontentCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('ViewcoursecontentCtrl', function ($scope, $http, $routeParams, alertService, userService, $location) {

    $scope.params = $routeParams;
    $scope.courseId = $scope.params.courseId;

    $scope.viewContent = function() {
      $http.get('/app/v1/course?id=' + $scope.courseId)
        .error(function(data) {
          alertService.add('danger', data.error.message);
        })
        .success(function(data) {
          $scope.course = data;
        });
    };

    $scope.viewContent();
  });