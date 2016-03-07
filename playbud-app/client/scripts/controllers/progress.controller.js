angular
  .module('Playbud')
  .controller('ProgressCtrl', ProgressCtrl);

function ProgressCtrl ($scope, $reactive) {
  $reactive(this).attach($scope);
}
