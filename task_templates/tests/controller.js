'use strict';

describe('Controller: <%= name %>Ctrl', function () {

  // load the controller's module
  beforeEach(module('<%= appName %>'));

  var <%= name %>Ctrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    <%= name %>Ctrl = $controller('<%= name %>Ctrl', {
      $scope: scope
    });
  }));

  it('should attach test', function () {
    expect(false).toBe(true);
  });
});
