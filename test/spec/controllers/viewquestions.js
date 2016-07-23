'use strict';

describe('Controller: ViewquestionsCtrl', function () {

  // load the controller's module
  beforeEach(module('clientApp'));

  var ViewquestionsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ViewquestionsCtrl = $controller('ViewquestionsCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ViewquestionsCtrl.awesomeThings.length).toBe(3);
  });
});
