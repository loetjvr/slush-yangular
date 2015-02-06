'use strict';

angular.module('<%= appName %>')
  .controller('MainCtrl', function ($scope) {
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
