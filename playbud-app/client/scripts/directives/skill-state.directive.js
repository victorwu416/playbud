var playbudApp = angular.module('Playbud');

playbudApp.directive('skillState', function () {
  return {
    replace: true,
    scope: {
      state: '='
    },
    template: '<span class=directive-{{state}}></span>'
  };
});
