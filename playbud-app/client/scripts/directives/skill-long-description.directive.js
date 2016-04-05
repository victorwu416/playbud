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
      $scope.formattedDescription = $scope.longDescription.split('{0}').join($scope.childName);
    }
  };
});
