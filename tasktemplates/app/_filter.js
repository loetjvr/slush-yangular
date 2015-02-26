'use strict';

/**
 * @ngdoc filter
 * @name <%= appName %>.filter:<%= name %>
 * @function
 * @description
 * # <%= name %>
 * Filter in <%= appName %>.
 */
angular.module('<%= appName %>')
  .filter('<%= name %>', function() {
    return function(input) {
      return 'example filter: ' + input;
    };
  });
