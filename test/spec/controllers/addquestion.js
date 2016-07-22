'use strict';

describe('Controller: AddquestionCtrl', function () {

  // load the controller's module
  beforeEach(module('clientApp'));

  var AddquestionCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AddquestionCtrl = $controller('AddquestionCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(AddquestionCtrl.awesomeThings.length).toBe(3);
  });
});
