'use strict';

angular.module('devroomFullstackApp')
  .controller('MainCtrl', function ($scope, $http, $stateParams) {
    $scope.awesomeThings = ['Test'];

    $scope.timetable = null;

    $http.get('http://devplan.uek.krakow.pl/api/timetables/' + $stateParams.timetableId).success(function (data) {
      $scope.timetable = data;
      console.log($scope.timetable);
      $scope.getNearestActivity($scope.timetable.activities);
    });

    $scope.currentActivity = null;

    $scope.getNearestActivity = function (activities) {
      var currentTimestamp = new Date().getTime();
      for (var i = 0; i < activities.length; i++) {
        if (currentTimestamp < activities[i].starts_at_timestamp*1000) {
          $scope.currentActivity = activities[i];
          console.log(currentTimestamp, activities[i].starts_at_timestamp*1000);
          break;
        }
      }
      //return $scope.currentActivity = null;
    };
  });


