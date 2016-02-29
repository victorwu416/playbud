angular
  .module('Playbud')
  .controller('AccountCtrl', AccountCtrl);

function AccountCtrl ($scope, $reactive) {
  $reactive(this).attach($scope);

  this.hello = 'hello account';

  console.log('AccountCtrl');
}
