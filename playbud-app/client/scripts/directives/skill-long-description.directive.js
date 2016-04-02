angular.module('Playbud').directive('skillLongDescription', function () {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      longDescription: '=longDescription',
      childName: '=childName'
    },
    template: '<span>{{formattedDescription}}</span>',
    controller: function ($scope) {
      $scope.formattedDescription = $scope.longDescription.replace('{0}', $scope.childName);
    }
  };
});
