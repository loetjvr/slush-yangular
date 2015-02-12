'use strict';

angular.module('<%= appName %>')
  .filter('<%= name %>', function() {
    return function(input) {
      return 'example filter: ' + input;
    };
  });
