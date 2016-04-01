angular
  .module('Playbud')
  .controller('FirstCtrl', FirstCtrl);

function FirstCtrl($reactive, $scope) {
  var _instance = this;
  $reactive(_instance).attach($scope);
}
