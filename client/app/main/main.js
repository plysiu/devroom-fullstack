'use strict';

angular.module('devroomFullstackApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/:timetableId',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      });

  });
