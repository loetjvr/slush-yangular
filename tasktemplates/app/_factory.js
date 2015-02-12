'use strict';

angular.module('<%= appName %>')
  .factory('<%= name %>', function() {
    // Service logic
    // ...

    var value = 42;

    // Public API here
    return {
      someMethod: function() {
        return value;
      }
    };
  });
