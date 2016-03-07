angular
  .module('Playbud')
  .controller('SignupCtrl', SignupCtrl);

function SignupCtrl ($scope, $reactive) {
  $reactive(this).attach($scope);
}
