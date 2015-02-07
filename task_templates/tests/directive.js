'use strict';

describe('Directive: <%= name %>', function () {

  // load the directive's module
  beforeEach(module('<%= appName %>'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<<%= name %>></<%= name %>>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the <%= name %> directive');
  }));
});
