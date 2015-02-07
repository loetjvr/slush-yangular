'use strict';

describe('Service: <%= name %>', function () {

  // load the service's module
  beforeEach(module('<%= appName %>'));

  // instantiate service
  var <%= name %>;
  beforeEach(inject(function (_<%= name %>_) {
    <%= name %> = _<%= name %>_;
  }));

  it('should do something', function () {
    expect(!!<%= name %>).toBe(true);
  });

});
