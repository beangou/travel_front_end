'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:AddcourseCtrl
 * @description
 * # AddcourseCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('AddcourseCtrl', function ($scope, $http, alertService, $location) {

    $scope.course = function() {
      var payload = {
        type : $scope.type,
        title: $scope.title,
        content : $scope.content,
        parentId: $scope.parentId
      };
      $http.post('/v1/course', payload)
        .error(function(data, status) {
          if(status === 400) {
            angular.forEach(data, function(value, key) {
              if(key === 'type' || key === 'content' || key === 'title' || key === 'parentId') {
                alertService.add('danger', key + ' : ' + value);
              } else {
                alertService.add('danger', value.message);
              }
            });
          } else if(status === 401) {
            $location.path('/login');
          } else if(status === 500) {
            alertService.add('danger', 'Internal server error!');
          } else {
            alertService.add('danger', data);
          }
        })
        .success(function(data) {
            $scope.type = '';
            $scope.title = '';
            $scope.content = '';
            $scope.parentId = '';
            alertService.add('success', data.success.message);
        });
    };
  });
