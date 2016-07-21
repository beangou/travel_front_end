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

    $('.selectpicker').on('change', function(){
      // 根据type和parentId查询下个下拉框的值
      var id = $(this).find("option:selected").val();
      var type = $(this).attr("id").split("_")[1];
      if(id) {
        var nextType = 1+parseInt(type)
        for(var j=nextType; j<5; j++) {
          $('#select_'+j).html("");
          $('#select_'+j).text("");
        }
        $('#content').val("");
        if(nextType == 5) {
          $scope.loadContent(id);
        }else {
          $scope.loadCourses(nextType, id);
        }
      }
    });

    $scope.loadCourses = function(type, parentId) {
      $('#select_'+type).html("");
      $('#select_'+type).text("");
      var postObject = new Object();
      postObject.parentId = parentId;
      $http.post('/app/v1/courses', postObject)
        .error(function(data, status) {
          if(status === 401) {
            $location.path('/login');
          } else {
            alertService.add('danger', data.error.message);
          }
        })
        .success(function(data) {
          $.each(data, function (i, item) {
            if(i == 0) {
              // 获取下个下拉框的内容
              if(type < 4) {
                // 加载目录
                $scope.loadCourses(type+1, item.id);
              }else {
                // 加载内容
                $scope.loadContent(item.id);
              }
            }
            $('#select_'+type).append($('<option>', {
              value: item.id,
              text : item.title
            }));
          });
        });
    };

    $scope.loadContent = function(id) {

      var postObject = new Object();
      postObject.id = id;
      $http.post('/app/v1/course', postObject)
        .error(function(data, status) {
          if(status === 401) {
            $location.path('/login');
          } else {
            alertService.add('danger', data.error.message);
          }
        })
        .success(function(data) {
          if(data) {
            $('#content').val(data.content);
          }else {
            $('#content').val("");
          }
        });
    };

    // 更新
    $scope.update =  function(id, content) {
      var payload = {
        id : id,
        content: content
      };
      $http.patch('app/v1/course', payload)
        .error(function(data, status) {
          if(status === 400) {
            angular.forEach(data, function(value, key) {
              if(key === 'id' || key === 'content') {
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
          alertService.add('success', data.success.message);
        });
    }

    $scope.loadCourses(1, 0);

    // 更新记录(更新content)
    $scope.updateContent = function() {
      var value = $('#button_content_save').val();
      if("+" == value) {
        // 文本框清空, 显示save按钮
        $('#button_content_save').val("save");
        $('#button_content_cancel').show();
      }else {
        // 调用保存方法, 找出参数
        var content = $('#content').val();
        var id = $('#select_4').val();
        if(content) {
          $scope.update(id, content);
        }else {
          alertService.add('danger', "小节内容不能为空!");
        }
      }
    };

    // 新增记录
    $scope.toSaveOrSave = function(type) {
      // 根据value值判断是去增加还是保存
      var value = $('#buttion_'+type).val();
      if("+" == value) {
        // 去增加,即下拉框隐藏,输入框显示
        $('#select_'+type).hide();
        $('#title_'+type).show();
        $('#buttion_'+type).val("save");
        $('#buttion_cancel_'+type).show();
      }else {
        // 调用保存方法, 找出参数
        var title = $('#title_'+type).val();
        var parentId = 0;
        if(type != 1) {
          parentId = $('#select_'+(type-1)).val();
        }
        $scope.course(type, title, parentId);
      }
    };

    $scope.cancel = function(type) {
      $('#buttion_cancel_'+type).hide();
      $('#buttion_'+type).val("+");
      $('#select_'+type).show();
      $('#title_'+type).hide();
    };

    $scope.course = function(type, title, parentId) {

      var payload = {
        type : type,
        title: title,
        parentId: parentId
      };

      $http.post('app/v1/addcourse', payload)
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
          $('#title_'+type).val("");
          alertService.add('success', data.success.message);
          $scope.loadCourses(type, parentId);
        });
    };
  });
