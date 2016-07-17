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
    var postObject = new Object();
    postObject.parentId = $scope.courseId;
    $http.post('/app/v1/courses', postObject)
        .error(function(data) {
          alertService.add('danger', data.error.message);
        })
        .success(function(data) {
          $scope.courses = data;
        });
    };

    $scope.viewCourses();
  });
