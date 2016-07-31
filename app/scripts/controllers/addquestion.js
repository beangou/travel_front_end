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
    var quetionType = 1;

    $scope.selectType = function(type) {
      quetionType = type;
    }

    $scope.addQuestion = function() {

      var optionArr=new Array();
      var answerArr=new Array();
      var analysis = "";
      var title = "";

      if(quetionType == 1) {
        $('.single_option').each(function(){
          optionArr.push($(this).val());//向数组中添加元素
        });
        $('input[name="single_answer"]:checked').each(function(){
          answerArr.push($(this).val());//向数组中添加元素
        });

        if(optionArr.length == 0 || answerArr.length != 1 || !$('#single_title').val() || !$('#single_analysis').val()) {
          alertService.add('success', "参数没哟填全或者答案不止一个,请核实!");
          return;
        }
        title = $('#single_title').val();
        analysis = $('#single_analysis').val();
      }else if(quetionType == 2) {
        $('.multiple_option').each(function(){
          optionArr.push($(this).val());//向数组中添加元素
        });
        $('input[name="multiple_answer"]:checked').each(function(){
          answerArr.push($(this).val());//向数组中添加元素
        });

        if(optionArr.length == 0 || answerArr.length < 2 || !$('#multiple_title').val() || !$('#multiple_analysis').val()) {
          alertService.add('success', "参数没哟填全或者答案少于两个,请核实!");
          return;
        }
        title = $('#multiple_title').val();
        analysis = $('#multiple_analysis').val();
      }else {
        title = $('#judgment_title').val();
        answerArr = $('input[name="judgment_answer"]:checked').val();
        analysis = $('#judgment_analysis').val();
      }

      var payload = {
        title :   title,
        options:  optionArr,
        answers:  answerArr,
        analysis: analysis,
        type: quetionType
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
          $('.answer').attr("checked", false);
          if(quetionType == 1) {
            $('#single_title').val("");
            $('#single_optionA').val("A.");
            $('#single_optionB').val("B.");
            $('#single_optionC').val("C.");
            $('#single_optionD').val("D.");
            $('#single_analysis').val("");
          }else if(quetionType == 2) {
            $('#multiple_title').val("");
            $('#multiple_optionA').val("A.");
            $('#multiple_optionB').val("B.");
            $('#multiple_optionC').val("C.");
            $('#multiple_optionD').val("D.");
            $('#multiple_analysis').val("");
          }else {
            $('#judgment_title').val("");
            $('#judgment_analysis').val("");
          }

          alertService.add('success', data.success.message);
        });
    };
  });
