angular.module('Playbud').directive('skillState', function () {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      state: '=state'
    },
    template: '<span>{{state}}</span>'
  };
});
