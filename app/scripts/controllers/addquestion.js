'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:AddquestionCtrl
 * @description
 * # AddquestionCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('AddquestionCtrl', function ($scope, $http, alertService, $location) {

    $scope.addQuestion = function() {

      var optionArr=new Array();
      var answerArr=new Array();

      $('.option').each(function(){
        optionArr.push($(this).val());//向数组中添加元素
      });
      $('input[name="answer"]:checked').each(function(){
        answerArr.push($(this).val());//向数组中添加元素
      });

      if(optionArr.length == 0 || answerArr.length == 0 || !$('#title').val() || !$('#analysis').val()) {
        alertService.add('success', "参数没哟填全,请核实!");
        return;
      }

      var payload = {
        title :   $('#title').val(),
        options:  optionArr,
        answers:  answerArr,
        analysis: $('#analysis').val()
      };

      $http.post('/app/v1/addquestion', payload)
        .error(function(data, status) {
          if(status === 400) {
            angular.forEach(data, function(value, key) {
              if(key === 'subject' || key === 'content') {
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
          $('#title').val("");
          $('#optionA').val("A.");
          $('#optionB').val("B.");
          $('#optionC').val("C.");
          $('#optionD').val("D.");
          $('.answer').attr("checked", false);
          $('#analysis').val("");
          alertService.add('success', data.success.message);
        });
    };
  });
