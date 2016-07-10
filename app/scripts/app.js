'use strict';

/**
 * @ngdoc overview
 * @name clientApp
 * @description
 * # clientApp
 *
 * Main module of the application.
 */
angular
  .module('clientApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.bootstrap'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .when('/signup', {
        templateUrl: 'views/signup.html',
        controller: 'SignupCtrl',
      })
      .when('/dashboard', {
        templateUrl: 'views/dashboard.html',
        controller: 'DashboardCtrl'
      })
      .when('/addpost', {
        templateUrl: 'views/addpost.html',
        controller: 'AddpostCtrl'
      })
      .when('/viewpost/:postId', {
        templateUrl: 'views/viewpost.html',
        controller: 'ViewpostCtrl'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .when('/addcourse', {
        templateUrl: 'views/addcourse.html',
        controller: 'AddcourseCtrl'
      })
      .when('/viewcourse/:courseId', {
        templateUrl: 'views/viewcourse.html',
        controller: 'ViewcourseCtrl'
      })
      .when('/viewcoursecontent/:courseId', {
        templateUrl: 'views/viewcoursecontent.html',
        controller: 'ViewcoursecontentCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
