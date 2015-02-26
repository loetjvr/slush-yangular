'use strict';

/**
 * @ngdoc directive
 * @name <%= appName %>.directive:<%= name %>
 * @description
 * # <%= name %>
 */
angular.module('<%= appName %>')
  .directive('<%= name %>', function() {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element) {
        element.text('this is the example text');
      }
    };
  });
