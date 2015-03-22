'use strict';

angular.module('devroomFullstackApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('homepage', {
        url: '/',
        templateUrl: 'app/homepage/homepage.html',
        controller: 'HomepageCtrl'
      });
  });
