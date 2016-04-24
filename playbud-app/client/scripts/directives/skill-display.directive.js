angular.module('Playbud').directive('skillDisplay', function () {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      skill: '=skill',
      displayLongDescription: '=displayLongDescription',
      childName: '=childName'
    },
    controller: function ($scope) {
      if ($scope.displayLongDescription) {
        $scope.formattedDescription = $scope.skill.longDescription.split('{0}').join($scope.childName);
      } else {
        $scope.formattedDescription = '';
      }
      $scope.delayedMessage = '';
      $scope.$watch('skill', function () {
        if ($scope.skill.delayed && ($scope.skill.state !== 'passed') && ($scope.skill.state !== 'skipped')) {
          $scope.delayedMessage = 'DELAYED';
        } else {
          $scope.delayedMessage = '';
        }
      });
    },
    template:
      '<div>\
        <h2><span ng-show="{{skill.requiresToy}}"><i class="icon ion-cube"></i></span> {{skill.shortDescription}}</h2>\
        <p>\
          <span>{{formattedDescription}}</span>\
        </p>\
        <p>\
          <span>Suggested {{skill.months}} months </span>\
          <span class="msg-skill-delayed">{{delayedMessage}}</span>\
        </p>\
        <p>\
          <span class="styled-state-{{skill.state}}"></span> \
          <span>{{skill.newestAnswerDateFormatted}}</span>\
        </p>\
      </div>'
  };
});
