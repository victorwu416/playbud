angular
  .module('Playbud')
  .controller('SignupCtrl', SignupCtrl);

function SignupCtrl ($scope, $reactive) {
  $reactive(this).attach($scope);

  this.hello = 'hello signup';

  console.log('SignupCtrl');

}
