angular
  .module('Playbud')
  .controller('EvaluateCtrl', EvaluateCtrl);

function EvaluateCtrl ($scope, $reactive) {
  $reactive(this).attach($scope);

  this.hello = 'hello evaluate';

  console.log('EvaluateCtrl');
}
