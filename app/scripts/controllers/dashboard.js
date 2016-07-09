'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('DashboardCtrl', function ($scope, $log, $http, alertService, $location) {

    $scope.loadBooks = function() {
      $http.get('/app/v1/courses')
        .error(function(data, status) {
          if(status === 401) {
            $location.path('/login');
          } else {
            alertService.add('danger', data.error.message);
          }
        })
        .success(function(data) {
          $scope.books = data;
        });
    };

    $scope.loadBooks();
  });
