'use strict';

describe('Service: <%= name %>', function() {

  // load the service's module
  beforeEach(module('<%= appName %>'));

  // instantiate service
  var <%= name %>;
  beforeEach(inject(function(_<%= name %>_) {
    <%= name %> = _<%= name %>_;
  }));

  it('should be 42', function() {
    expect(<%= name %>).toBe(42);
  });

});
