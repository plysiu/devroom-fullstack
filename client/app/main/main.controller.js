'use strict';

angular.module('devroomFullstackApp')
  .controller('MainCtrl', function ($scope, $http, $stateParams, $interval) {

    console.log($stateParams.timetableId);
    $scope.isPlace = function () {
      return $stateParams.timetableId.indexOf('p') === 0;
    };


    $scope.getTutorName = function () {
      for (var i = 0; i < $scope.currentActivity.tutors.length; i++) {
        if (parseInt($scope.currentActivity.tutors[i].id) === parseInt($stateParams.timetableId.substr(1))) {
          return $scope.currentActivity.tutors[i].name;
        }
      }
    }
    $scope.timetable = null;
    $http.get('http://devplan.uek.krakow.pl/api/timetables/' + $stateParams.timetableId)
      .success(function (data) {
        $scope.setTimetable(data);
      }).error(function () {

        if ($scope.isPlace()) {
          var
            data = {
              place_id: [
                $stateParams.timetableId.substr(1)
              ]
            };
        }
        else {
          var
            data = {
              tutor_id: [
                $stateParams.timetableId.substr(1)
              ]
            };
        }

        $http.post('http://devplan.uek.krakow.pl/api/timetables', data).success(function () {
          $http.get('http://devplan.uek.krakow.pl/api/timetables/' + $stateParams.timetableId)
            .success(function (data) {
              $scope.setTimetable(data);
            });
        });
      });

    $scope.setTimetable = function (data) {
      $scope.timetable = data;
      $scope.getNearestActivity($scope.timetable.activities);

      $scope.getActivityProgress();
      $interval(function () {
        $scope.getActivityProgress()
      }, 60000);
    };
    $scope.currentActivity = null;

    $scope.getNearestActivity = function (activities) {
      var currentTimestamp = Math.floor(new Date().getTime() / 1000);
      for (var i = 0; i < activities.length; i++) {
        if (currentTimestamp < activities[i].ends_at_timestamp) {
          $scope.currentActivity = activities[i];
          break;
        }
      }
    };
    $scope.progress = 0;
    $scope.getActivityProgress = function () {
      var time = Math.floor(new Date().getTime() / 1000);
      $scope.progress = ( (time - $scope.currentActivity.starts_at_timestamp ) / ( ($scope.currentActivity.ends_at_timestamp - $scope.currentActivity.starts_at_timestamp) )) * 100;
    };
  })
;
