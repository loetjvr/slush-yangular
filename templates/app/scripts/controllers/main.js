'use strict';

/**
 * @ngdoc function
 * @name <%= appName %>.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of <%= appName %>
 */
angular.module('<%= appName %>')
  .controller('MainCtrl', function($scope) {
    $scope.tasks = [
      'view',
      'controller',
      'route',
      'directive',
      'filter',
      'service',
      'factory',
      'constant'
    ];
  });
