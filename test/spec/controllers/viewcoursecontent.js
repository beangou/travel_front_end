'use strict';

describe('Controller: ViewcontentCtrl', function () {

  // load the controller's module
  beforeEach(module('clientApp'));

  var ViewcontentCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ViewcontentCtrl = $controller('ViewcontentCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ViewcontentCtrl.awesomeThings.length).toBe(3);
  });
});
