angular
  .module('Playbud')
  .controller('UserProfileCtrl', UserProfileCtrl);

function UserProfileCtrl ($scope, $reactive, $state) {
  $reactive(this).attach($scope);


}
