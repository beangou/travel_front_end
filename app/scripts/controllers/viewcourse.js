'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:ViewcourseCtrl
 * @description
 * # ViewcourseCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('ViewcourseCtrl', function ($scope, $http, $routeParams, alertService, userService, $location) {

    $scope.params = $routeParams;
    $scope.courseId = $scope.params.courseId;

    $scope.viewCourses = function() {
      $http.get('/app/v1/courses?parentId=' + $scope.courseId)
        .error(function(data) {
          alertService.add('danger', data.error.message);
        })
        .success(function(data) {
          $scope.courses = data;
        });
    };

    $scope.viewCourses();
  });
