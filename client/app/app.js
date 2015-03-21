'use strict';

angular.module('devroomFullstackApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'ui.bootstrap',
  'angular-google-analytics',
  'angularMoment',
  'ngFx'
])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
  }).config(function (AnalyticsProvider) {
    AnalyticsProvider.setAccount('UA-46869390-6');
    AnalyticsProvider.trackPages(true);
    AnalyticsProvider.trackUrlParams(true);
    AnalyticsProvider.useDisplayFeatures(true);
    AnalyticsProvider.useAnalytics(true);
    AnalyticsProvider.useECommerce(true, false);
    AnalyticsProvider.useECommerce(true, true);
    AnalyticsProvider.useEnhancedLinkAttribution(true);
  })
  .run(function (Analytics) {
  })
  .run(function(amMoment) {
    amMoment.changeLocale('pl');
  });
