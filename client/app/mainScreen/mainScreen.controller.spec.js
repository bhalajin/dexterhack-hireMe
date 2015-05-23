'use strict';

describe('Controller: MainScreenCtrl', function () {

  // load the controller's module
  beforeEach(module('dexterhackHireMeApp'));

  var MainScreenCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainScreenCtrl = $controller('MainScreenCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
