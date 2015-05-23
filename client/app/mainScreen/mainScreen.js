'use strict';

angular.module('dexterhackHireMeApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/mainScreen/mainScreen.html',
        controller: 'MainScreenCtrl'
      });
  });
