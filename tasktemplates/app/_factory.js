'use strict';

/**
 * @ngdoc service
 * @name <%= appName %>.<%= name %>
 * @description
 * # <%= name %>
 * Factory in <%= appName %>.
 */
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
