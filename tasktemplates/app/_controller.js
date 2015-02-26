'use strict';

/**
 * @ngdoc function
 * @name <%= appName %>.controller:<%= name %>Ctrl
 * @description
 * # <%= name %>Ctrl
 * Controller of <%= appName %>
 */
angular.module('<%= appName %>')
  .controller('<%= name %>Ctrl', function($scope) {
    $scope.name = '<%= name %>Ctrl';
  });
