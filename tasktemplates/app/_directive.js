'use strict';

angular.module('<%= appName %>')
  .<%= name %>('<%= name %>', function() {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element) {
        element.text('this is the example text');
      }
    };
  });
